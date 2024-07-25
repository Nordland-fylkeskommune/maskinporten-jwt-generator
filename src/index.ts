import * as fs from 'fs';
import * as url from 'url';
import * as jwt from 'jsonwebtoken';
import NodeCache from 'node-cache';
import { type Config } from './config/config';
import crypto from 'crypto';
const cacheObj = new NodeCache({
  stdTTL: 3600,
});
const cacheKey = 'maskinportToken';

interface Token {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export async function generateJWT(config: Config): Promise<string> {
  const privateKey =
    'PrivateKey' in config
      ? config.PrivateKey
      : fs.readFileSync(config.PrivateKeyPath, 'utf-8');

  const token = jwt.sign(
    {
      aud: config.Audience,
      iss: config.Issuer,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 12,
      jti: crypto.randomUUID(),
      ...(config.Scopes && { scope: config.Scopes }),
      ...(config.Resource && { resource: config.Resource }),
    },
    privateKey,
    { algorithm: 'RS256', keyid: config.KID },
  );

  return token;
}

export async function getMaskinportToken(config: Config): Promise<Token> {
  const token = cacheObj.get<Token>(cacheKey);
  if (token) {
    return token;
  }
  const jwtToken = await generateJWT(config);

  const data = new url.URLSearchParams();
  data.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
  data.append('assertion', jwtToken);

  const resp = await fetch(config.Endpoint, {
    method: 'POST',
    body: data,
  });

  if (!resp.ok) {
    throw new Error(`Failed to get token. Response status: ${resp.status}`);
  }

  const tokenResp: Token = await resp.json();

  cacheObj.set(cacheKey, tokenResp, tokenResp.expires_in - 60);

  return tokenResp;
}

export type { Token };

export * from './config/config';

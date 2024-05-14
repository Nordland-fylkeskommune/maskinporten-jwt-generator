import { z } from 'zod';
import * as dotenv from 'dotenv';
import { getRandomValues } from 'crypto';
dotenv.config();

// export const ConfigSchema = z.object({
//   Audience: z.string(),
//   Endpoint: z.string(),
//   Issuer: z.string(),
//   Scopes: z.string(),
//   KID: z.string(),
//   PrivateKey: z.string(),
//   Resource: z.string(),
// });

export const configSchemaWithPrivateKeyPath = z.object({
  Audience: z.string().optional(),
  Endpoint: z.string(),
  Issuer: z.string(),
  Scopes: z.string(),
  KID: z.string(),
  PrivateKeyPath: z.string(),
  Resource: z.string(),
});

export const configSchemaWithPrivateKey = z.object({
  Audience: z.string().optional(),
  Endpoint: z.string(),
  Issuer: z.string(),
  Scopes: z.string(),
  KID: z.string(),
  PrivateKey: z.string(),
  Resource: z.string(),
});

export const configSchema = configSchemaWithPrivateKey.or(
  configSchemaWithPrivateKeyPath,
);

// either private key or private key path

export type Config = z.infer<typeof configSchema>;

export type ConfigWithPrivateKey = z.infer<typeof configSchemaWithPrivateKey>;

export type ConfigWithPrivateKeyPath = z.infer<
  typeof configSchemaWithPrivateKeyPath
>;

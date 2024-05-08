import { z } from 'zod';
import * as dotenv from 'dotenv';
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

export const ConfigSchemaWithPrivateKeyPath = z.object({
  Audience: z.string(),
  Endpoint: z.string(),
  Issuer: z.string(),
  Scopes: z.string(),
  KID: z.string(),
  PrivateKeyPath: z.string(),
  Resource: z.string(),
});

export const ConfigSchemaWithPrivateKey = z.object({
  Audience: z.string(),
  Endpoint: z.string(),
  Issuer: z.string(),
  Scopes: z.string(),
  KID: z.string(),
  PrivateKey: z.string(),
  Resource: z.string(),
});

export const ConfigSchema = ConfigSchemaWithPrivateKey.or(
  ConfigSchemaWithPrivateKeyPath,
);

// either private key or private key path

export type Config = z.infer<typeof ConfigSchema>;

import { z } from 'zod';
import * as dotenv from 'dotenv';
dotenv.config();

const ConfigSchema = z.object({
  Audience: z.string(),
  Endpoint: z.string(),
  Issuer: z.string(),
  Scopes: z.string(),
  KID: z.string(),
  PrivateKey: z.string(),
  Resource: z.string(),
});

export type Config = z.infer<typeof ConfigSchema>;

export const config = ConfigSchema.parse({
  Audience: process.env.AUD,
  Endpoint: process.env.ENDPOINT,
  Issuer: process.env.ISS,
  Scopes: process.env.SCOPES,
  KID: process.env.KID,
  PrivateKey: process.env.PRIVATE_KEY,
  Resource: process.env.RESOURCE,
});

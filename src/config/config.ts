import { z } from 'zod';
import * as dotenv from 'dotenv';
dotenv.config();

export const ConfigSchema = z.object({
  Audience: z.string(),
  Endpoint: z.string(),
  Issuer: z.string(),
  Scopes: z.string(),
  KID: z.string(),
  PrivateKey: z.string(),
  Resource: z.string(),
});

export type Config = z.infer<typeof ConfigSchema>;

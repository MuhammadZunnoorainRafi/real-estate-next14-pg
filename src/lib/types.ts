import { z } from 'zod';
import { LogUserSchema, RegUserSchema } from './schemas';

export type RegUserType = z.infer<typeof RegUserSchema>;
export type LogUserType = z.infer<typeof LogUserSchema>;

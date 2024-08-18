import { z } from 'zod';
import { LogSchema, RegSchema, ServerSchema } from './schemas';
import { UUID } from 'crypto';

export type LogType = z.infer<typeof LogSchema>;
export type RegType = z.infer<typeof RegSchema>;
export type ServerType = z.infer<typeof ServerSchema>;

export type UserType = RegType & {
  id: string;
};

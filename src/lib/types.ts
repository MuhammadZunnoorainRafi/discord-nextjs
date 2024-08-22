import { z } from 'zod';
import { LogSchema, RegSchema, ServerSchema } from './schemas';
import { Member, Profile, Server } from '@prisma/client';
import { NextApiResponse } from 'next';
import { Server as NetServer, Socket } from 'net';
import { Server as SocketIoServer } from 'socket.io';

export type LogType = z.infer<typeof LogSchema>;
export type RegType = z.infer<typeof RegSchema>;
export type ServerType = z.infer<typeof ServerSchema>;

export type UserType = RegType & {
  id: string;
};

export type ServerWithMembersWithProfilesType = Server & {
  members: Member & { profile: Profile };
};

export type NextApiResponseWithSocketIoType = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIoServer;
    };
  };
};

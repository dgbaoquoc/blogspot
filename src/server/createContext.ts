import { NodeHTTPCreateContextFnOptions } from '@trpc/server/dist/declarations/src/adapters/node-http';
import EventEmitter from 'events';
import { IncomingMessage } from 'http';
import ws from 'ws';

import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getSession } from 'next-auth/react';

const ee = new EventEmitter();

export const createContext = async (
  opts?:
    | CreateNextContextOptions
    | NodeHTTPCreateContextFnOptions<IncomingMessage, ws>
) => {
  const req = opts?.req;
  const res = opts?.res;

  const session = req && res && (await getSession({ req }));

  return { req, res, session, ee };
};

export type Context = inferAsyncReturnType<typeof createContext>;

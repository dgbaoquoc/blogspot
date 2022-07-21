import fetch from 'node-fetch';
import { createRouter } from './../createRouter';
import { roomRouter } from './room';

if (!global.fetch) {
  (global.fetch as any) = fetch;
}

export const appRouter = createRouter().merge('room.', roomRouter);

export type AppRouter = typeof appRouter;

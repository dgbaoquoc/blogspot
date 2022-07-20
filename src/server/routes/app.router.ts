import { createRouter } from './../createRouter';
import { roomRouter } from './room';

export const appRouter = createRouter().merge('room', roomRouter);

export type AppRouter = typeof appRouter;

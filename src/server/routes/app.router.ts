import { createRouter } from './../createRouter';
export const appRouter = createRouter().query('hello', {
  resolve: () => {
    return 'Coup';
  },
});

export type AppRouter = typeof appRouter;

import { AppRouter } from '@/server/routes/app.router';
import { createReactQueryHooks } from '@trpc/react';

export const trpc = createReactQueryHooks<AppRouter>();

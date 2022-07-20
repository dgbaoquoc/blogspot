import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { NextPageWithLayout } from './page';

// tRPC dependencies
import { AppRouter } from '@/server/routes/app.router';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { createWSClient, wsLink } from '@trpc/client/links/wsLink';
import { withTRPC } from '@trpc/next';

import superjson from 'superjson';

interface AppPropsWithLayouts extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: AppPropsWithLayouts) {
  const getLayout = Component.getLayout || ((page) => page);
  return <>{getLayout(<Component {...pageProps} />)}</>;
}

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return '';
  }
  if (process.browser) return ''; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
};

const url = `${getBaseUrl()}/api/trpc`;

const getEndingLink = () => {
  if (typeof window === 'undefined') {
    return httpBatchLink({
      url,
    });
  }

  const client = createWSClient({
    url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001',
  });

  return wsLink<AppRouter>({
    client,
  });
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    return {
      links: [
        // pass logger link in here
        getEndingLink(),
      ],
      transformer: superjson,
      headers: () => {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
          };
        }
        return {};
      },
    };
  },
  ssr: false,
})(MyApp);

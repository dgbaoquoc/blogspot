import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { NextPageWithLayout } from './page';

// tRPC dependencies
import { AppRouter } from '@/server/routes/app.router';
import { withTRPC } from '@trpc/next';

import superjson from 'superjson';

interface AppPropsWithLayouts extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: AppPropsWithLayouts) {
  const getLayout = Component.getLayout || ((page) => page);
  return <>{getLayout(<Component {...pageProps} />)}</>;
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';

    return {
      url,
      transformer: superjson,
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);

import PrimaryLayout from '@/components/layouts/primary/PrimaryLayout';
import { trpc } from '@/utils/trpc';
import { NextPageWithLayout } from './page';

const Home: NextPageWithLayout = () => {
  const { data, isLoading } = trpc.useQuery(['hello']);

  if (isLoading) {
    return <div>...</div>;
  }

  return (
    <section className="flex flex-col items-center gap-y-5 mt-12 sm:mt-36">
      Hello, {data}
    </section>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

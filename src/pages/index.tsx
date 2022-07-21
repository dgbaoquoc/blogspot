import PrimaryLayout from '@/components/layouts/primary/PrimaryLayout';
import { customAlphabet } from 'nanoid';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from './page';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvqxyz0123456789', 5);

const Home: NextPageWithLayout = () => {
  const router = useRouter();

  const createRoom = () => {
    const roomId = nanoid();

    router.push(`/rooms/${roomId}`);
  };

  return (
    <>
      <Head>
        <title>Chat App</title>
        <meta
          name="description"
          content="Chat App with t3 stacks: Typescript, Tailwind, tRPC"
        />
      </Head>
      <section className="flex flex-col items-center gap-y-5 mt-6 sm:mt-3 mb-6">
        <h1 className="uppercase text-red-300">
          Chat App with t3 stacks: Typescript, Tailwind, tRPC
        </h1>

        <button className="btn-primary" onClick={createRoom}>
          Create Chat Room
        </button>
      </section>
    </>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

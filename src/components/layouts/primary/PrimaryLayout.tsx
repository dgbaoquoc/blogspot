import Head from 'next/head';
import Footer from '../footer/Footer';
import Header from '../header/Header';

export interface IPrimaryLayout extends React.ComponentPropsWithRef<'div'> {
  justify?: 'item-center' | 'item-start';
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({
  children,
  justify = 'item-center',
  ...props
}) => {
  return (
    <>
      <Head>
        <title>Blogspot</title>
      </Head>
      <div {...props} className={`min-h-screen flex flex-col ${justify}`}>
        <Header />
        <main className="px-5">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default PrimaryLayout;

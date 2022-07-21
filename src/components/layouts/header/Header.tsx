import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export interface IHeader extends React.ComponentPropsWithoutRef<'header'> {}

const Header: React.FC<IHeader> = ({ className, ...props }) => {
  const { data: session } = useSession();

  return (
    <header
      {...props}
      className={`w-full flex flex-row justify-between ${className}`}
    >
      <div className="space-x-5 m-5">
        <Link href="/">
          <a className="hover:underline">Home</a>
        </Link>
        <Link href="/about">
          <a className="hover:underline">About</a>
        </Link>
      </div>
      <div className="space-x-5 m-5">
        {session ? (
          <>
            <a className="text-blue-300">{session.user?.name}</a>
            <Link href="/">
              <a
                className="hover:underline"
                onClick={() => {
                  signOut();
                }}
              >
                Log Out
              </a>
            </Link>
          </>
        ) : (
          <Link href="/">
            <a className="hover:underline" onClick={() => signIn()}>
              Sign In
            </a>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

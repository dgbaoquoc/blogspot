import Link from 'next/link';

export interface IHeader extends React.ComponentPropsWithoutRef<'header'> {}

const Header: React.FC<IHeader> = ({ className, ...props }) => {
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
        <Link href="/">
          <a className="hover:underline">Sign In</a>
        </Link>
        <Link href="/">
          <a className="hover:underline">Log Out</a>
        </Link>
      </div>
    </header>
  );
};

export default Header;

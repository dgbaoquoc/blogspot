export interface IFooter extends React.ComponentPropsWithoutRef<'footer'> {}

const Footer: React.FC<IFooter> = ({ className, ...props }) => {
  return (
    <footer
      {...props}
      className={`w-full p-5 bg-slate-100 text-slate-500 ${className}`}
    >
      <p>
        Developed by <span className="text-blue-700">Coup Oab</span>
      </p>
    </footer>
  );
};

export default Footer;

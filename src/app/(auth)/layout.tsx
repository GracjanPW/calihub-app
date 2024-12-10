const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-full w-full items-center justify-center bg-gradient-to-tr from-neutral-100 via-neutral-200 to-neutral-100'>
      {children}
    </div>
  );
};

export default AuthLayout;

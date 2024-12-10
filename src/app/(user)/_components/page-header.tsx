export const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='m-auto -mt-10 min-h-[80px] w-full rounded-md bg-gradient-to-tr from-rose-400 via-rose-600 to-rose-800 p-1 shadow-sm'>
      <div className='flex h-full w-full flex-col items-center justify-center rounded-md bg-neutral-300 bg-transparent p-4 shadow-inner shadow-black'>
        {children}
      </div>
    </div>
  );
};

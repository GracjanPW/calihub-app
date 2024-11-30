export const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-[80px] w-full -mt-10 shadow-sm bg-gradient-to-tr from-rose-400 via-rose-600 to-rose-800 m-auto rounded-md p-1">
      <div className="bg-neutral-300 h-full shadow-inner shadow-black bg-transparent w-full p-4 rounded-md flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
};

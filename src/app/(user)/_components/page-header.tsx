export const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-[100px] w-full -mt-20 bg-neutral-400 m-auto rounded-md p-4 flex justify-center items-center">
      {children}
    </div>
  );
};

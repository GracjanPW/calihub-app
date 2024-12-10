import { TriangleAlert } from 'lucide-react';

export const FormError = ({ message }: { message: string }) => {
  return (
    <div className='flex w-full items-center rounded-md border border-rose-300 bg-rose-200 p-2 font-semibold text-rose-500'>
      <TriangleAlert className='mr-2 size-5' />
      {message}
    </div>
  );
};

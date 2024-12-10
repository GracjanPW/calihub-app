import { CheckCircle } from 'lucide-react';

export const FormSuccess = ({ message }: { message: string }) => {
  return (
    <div className='flex w-full items-center rounded-md border border-emerald-300 bg-emerald-200 p-2 font-semibold text-emerald-500'>
      <CheckCircle className='mr-2 size-5' />
      {message}
    </div>
  );
};

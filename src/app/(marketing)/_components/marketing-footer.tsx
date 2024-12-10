import { Button } from '@/components/ui/button';
import { Copyright } from 'lucide-react';

export const MarketingFooter = () => {
  return (
    <footer className='fixed bottom-0 w-full border-t bg-slate-100 p-4'>
      <div className='mx-auto flex w-full items-center justify-between md:max-w-screen-xl'>
        <p className='flex items-center font-semibold'>
          Calihub
          <Copyright className='ml-1 size-4' />
        </p>
        <div className='flex w-full items-center justify-end space-x-4 md:block md:w-auto'>
          <Button size={'sm'} variant={'ghost'} className='font-bold'>
            Privacy Policy
          </Button>
          <Button size={'sm'} variant={'ghost'} className='font-bold'>
            Terms of Service
          </Button>
        </div>
      </div>
    </footer>
  );
};

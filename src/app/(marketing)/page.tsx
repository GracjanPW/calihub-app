import { Button } from '@/components/ui/button';
import { Check, Package } from 'lucide-react';

const MarketingPage = () => {
  return (
    <div className='flex h-[500px] flex-col items-center justify-center space-y-6 text-center'>
      <div className='flex flex-col items-center space-y-4'>
        <div className='flex items-center rounded-md bg-red-500 p-2 px-4 text-3xl font-bold tracking-wider text-white'>
          ALL IN 1
          <Package className='ml-2 size-8' />
        </div>
        <h1 className='text-4xl font-semibold'>
          Everything you need for calisthenics
        </h1>
        <div className='flex flex-col items-center pl-4'>
          <p className='text-md flex items-center font-medium text-muted-foreground'>
            Track progress
            <Check className='ml-2 size-4 text-emerald-600' />
          </p>
          <p className='text-md flex items-center font-medium text-muted-foreground'>
            Create workouts
            <Check className='ml-2 size-4 text-emerald-600' />
          </p>
          <p className='text-md flex items-center font-medium text-muted-foreground'>
            Customize workout plans
            <Check className='ml-2 size-4 text-emerald-600' />
          </p>
        </div>
      </div>

      <Button className='text-md bg-red-800 font-bold'>Get Started Now!</Button>
    </div>
  );
};

export default MarketingPage;

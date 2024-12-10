import { Button } from '@/components/ui/button';
import { Roboto } from 'next/font/google';
import Link from 'next/link';

const font = Roboto({
  subsets: ['latin'],
  weight: ['700'],
  style: 'italic',
});

export const MarketingHeader = () => {
  return (
    <header className='flex h-[60px] w-full items-center justify-center bg-neutral-50 px-5 shadow-sm'>
      <div className='flex w-full max-w-4xl items-center justify-between'>
        <div
          className={`${font.className} text-xl tracking-wide text-neutral-800`}
        >
          CALIHUB
        </div>
        <div className='space-x-2'>
          <Button variant={'ghost'} size={'sm'} asChild>
            <Link href='/auth/sign-up'>Sign up</Link>
          </Button>
          <Button size={'sm'} asChild>
            <Link href='/auth/sign-in'>Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

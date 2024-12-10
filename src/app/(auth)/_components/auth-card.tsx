import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  footerText: string;
  footerUrl: string;
}

export const AuthCard = ({
  children,
  title,
  footerText,
  footerUrl,
}: AuthCardProps) => {
  return (
    <Card className='w-full max-w-[400px] overflow-hidden'>
      <CardHeader>
        <CardTitle className='flex items-center justify-center'>
          Welcome!
        </CardTitle>
        <CardDescription className='text-center text-lg font-medium'>
          {title}
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>{children}</CardContent>
      <CardFooter className='flex items-center justify-center bg-neutral-100 p-0'>
        <Button variant={'link'} asChild className='text-[#2f6bbf]'>
          <Link href={footerUrl}>{footerText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

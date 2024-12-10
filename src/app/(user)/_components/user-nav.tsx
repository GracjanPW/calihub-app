'use client';
import { Button } from '@/components/ui/button';
import { Boxes, Calendar, LucideWeight, Menu, Tag } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const nav_items = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    Icon: Boxes,
  },
  {
    label: 'Exercises',
    href: '/exercises',
    Icon: LucideWeight,
  },
  {
    label: 'Schedule',
    href: '/schedule',
    Icon: Calendar,
  },
  {
    label: 'Labels',
    href: '/labels',
    Icon: Tag,
  },
];

export const UserNav = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onClick = (url: string) => {
    router.push(url);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={'ghostDark'} size={'icon'}>
          <Menu className='!size-8 text-neutral-300' />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'}>
        <SheetHeader>
          <SheetTitle className='text-2xl'>Menu</SheetTitle>
          <SheetDescription aria-describedby='Menu navigation' />
        </SheetHeader>
        <Separator className='my-2' />
        <div className='space-y-2'>
          {nav_items.map((item) => (
            <Button
              key={item.href}
              variant={'ghost'}
              className={cn(
                'w-full items-center justify-start text-xl',
                item.href === pathname && 'bg-accent'
              )}
              onClick={() => onClick(item.href)}
            >
              <item.Icon className='!size-6' />
              {item.label}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

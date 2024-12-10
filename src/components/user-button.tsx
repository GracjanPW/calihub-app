'use client';
import { User } from '@prisma/client';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export const UserButton = ({ data }: { data: User }) => {
  const fallback = data.name?.charAt(0).toUpperCase();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className='relative outline-none'>
        <div className='w-min rounded-md bg-gradient-to-tr from-rose-400 via-rose-600 to-rose-800 p-[2px] shadow-sm'>
          <Avatar className='shadow-inner shadow-black'>
            <AvatarImage src={data.image as string} />
            <AvatarFallback className='bg-transparent text-xl font-bold text-neutral-100'>
              {fallback}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={async () => {
            signOut();
          }}
        >
          <LogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

'use client';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { AddExerciseForm } from './add-exercise-form';

export const AddExerciseDrawer = () => {
  const [open, setOpen] = useState(false);
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className='w-full font-semibold' variant={'outline'}>
          <Plus />
          Add new
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Add exercise</DrawerTitle>
          <DrawerDescription>
            Create new exercise here, be careful they name can not be changed
          </DrawerDescription>
        </DrawerHeader>
        <div className='mb-2 px-4'>
          <AddExerciseForm onSuccess={() => setOpen(false)} />
        </div>
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

'use client';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Label } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { EditLabelForm } from './edit-label-form';

interface EditLabelDrawerProps {
  open: boolean;
  data?: Label;
  setClose: () => void;
}

export const EditLabelDrawer = ({
  open,
  data,
  setClose,
}: EditLabelDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={setClose}>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>label</DrawerTitle>
          <DrawerDescription>
            Create new label here, these can be used to categorize your
            exercises
          </DrawerDescription>
        </DrawerHeader>
        <div className='mb-2 px-4'>
          {data && <EditLabelForm defaultValues={data} onSuccess={setClose} />}
        </div>
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline' onClick={setClose}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

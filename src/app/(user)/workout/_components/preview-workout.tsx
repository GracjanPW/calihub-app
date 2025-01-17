'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SchedulePopulated } from '@/type';
import chroma from 'chroma-js';

import { ExerciseSet } from './exercise-set';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { DialogClose } from '@radix-ui/react-dialog';
import { useMemo, useState } from 'react';
import { EditSetForm } from './edit-set-form';
import { ExerciseSet as ESet } from '@prisma/client';
import { PlusCircleIcon, PlusIcon } from 'lucide-react';

interface PreviewWorkoutProps {
  data: SchedulePopulated[];
}

export const PreviewWorkout = ({ data }: PreviewWorkoutProps) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [setToEdit, setSetToEdit] = useState<ESet | null>(null);

  const allSets = useMemo(() => {
    return data.reduce((a, i) => {
      a = [...a, ...i.exerciseSets];
      return a;
    }, [] as ESet[]);
  }, [data]);

  const openEditSet = (id: string) => {
    const set = allSets.find((i) => i.id === id);
    if (!set) return;
    setSetToEdit(set);
    setOpenEdit(true);
  };
  const closeEdit = () => {
    setOpenEdit(false);
    // setSetToEdit(null)
  };

  return (
    <>
      <div className='flex-1 overflow-y-auto'>
        <div className='h-0 space-y-4'>
          {data.map((schedule) => (
            <div key={schedule.id}>
              <div className='flex items-center space-x-3 rounded-md p-1 px-3 text-lg font-medium text-neutral-700'>
                <p>{schedule.exercise.name}</p>
                <div className='ml-1 flex space-x-1'>
                  {schedule.exercise.exerciseLabels.map(({ label }) => (
                    <div
                      key={`${label.name}-${label.color}`}
                      style={{ backgroundColor: chroma(label.color).css() }}
                      className='size-2 rounded-full'
                    />
                  ))}
                </div>
              </div>
              <Separator />
              <div className='space-y-2 p-2'>
                {schedule.exerciseSets.map((set) => (
                  <ExerciseSet
                    key={set.id}
                    set={set}
                    openEdit={() => openEditSet(set.id)}
                  />
                ))}
                <button className='mt-6 flex w-full items-center justify-center text-sm text-muted-foreground'>
                  <span>Add</span>
                  <PlusIcon className='ml-1 size-4' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Drawer open={openEdit} onOpenChange={setOpenEdit}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Schedule an exercise</DrawerTitle>
            <DrawerDescription>
              select an exercise and choose what day you want it on, you can
              change this later
            </DrawerDescription>
          </DrawerHeader>
          <div className='px-4'>
            <EditSetForm data={setToEdit!} onSuccess={closeEdit} />
          </div>
          <DrawerFooter>
            <DialogClose asChild>
              <Button variant={'outline'}>Cancel</Button>
            </DialogClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

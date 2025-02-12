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
import { useMemo, useOptimistic, useState } from 'react';
import { EditSetForm } from './edit-set-form';
import { ExerciseSet as ESet } from '@prisma/client';
import { PlusIcon } from 'lucide-react';
import { AddSetForm } from './add-set-form';
import { AddExerciseForm } from './add-exercise-form';
import { toDate } from 'date-fns';

interface PreviewWorkoutProps {
  data: SchedulePopulated[];
  day: string;
}

export const PreviewWorkout = ({ data, day }: PreviewWorkoutProps) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [setToEdit, setSetToEdit] = useState<ESet | null>(null);
  const [openAddSet, setOpenAddSet] = useState(false);
  const [scheduleIdOfSet, setScheduleIdOfSet] = useState<string | null>(null);
  const [openAddExercise, setOpenAddExercise] = useState(false);
  const [optimisticData, addOptimisticData] = useOptimistic<SchedulePopulated[],{action:string,data:any}>(data, (state,{action,data})=>{
    switch (action) {
      case "add":
        return [...state,data]
      case "edit":
      case "uncomplete":
      case "complete":
        state[data.scheduleIndex].exerciseSets[data.setIndex].completed = action === 'complete'
        return [...state]
      
      default:
        return state
    }
  })


  const handleAddSet = (id: string) => {
    setScheduleIdOfSet(id);
    setOpenAddSet(true);
  };

  const closeAddSet = () => {
    setScheduleIdOfSet(null);
    setOpenAddSet(false);
  };

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
          {optimisticData.map((schedule,scheduleIndex) => (
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
                {schedule.exerciseSets.map((set,setIndex) => (
                  <ExerciseSet
                    key={set.id}
                    set={set}
                    openEdit={() => openEditSet(set.id)}
                    optimisticComplete={(complete)=>addOptimisticData({action:complete?'complete':'uncomplete',data:{scheduleIndex, setIndex}})}
                  />
                ))}
                <button
                  onClick={() => handleAddSet(schedule.id)}
                  className='mt-6 flex w-full items-center justify-center text-sm text-muted-foreground'
                >
                  <span>Add</span>
                  <PlusIcon className='ml-1 size-4' />
                </button>
              </div>
            </div>
          ))}
          <Separator />
          <button
            onClick={() => setOpenAddExercise(true)}
            className='mx-auto flex w-full items-center justify-center rounded-md border py-1'
          >
            Add Exercise <PlusIcon className='size-4' />
          </button>
        </div>
      </div>
      <Drawer open={openEdit} onOpenChange={setOpenEdit}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit set</DrawerTitle>
            <DrawerDescription>
              Make changes to have many reps, weight or duration you actually achieved if different to the target.
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
      <Drawer open={openAddSet} onOpenChange={setOpenAddSet}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add Set</DrawerTitle>
          </DrawerHeader>
          <div className='px-4'>
            <AddSetForm scheduleId={scheduleIdOfSet!} onSuccess={closeAddSet} />
          </div>
          <DrawerFooter>
            <DialogClose asChild>
              <Button variant={'outline'}>Cancel</Button>
            </DialogClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer open={openAddExercise} onOpenChange={setOpenAddExercise}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Add Exercise</DrawerTitle>
          </DrawerHeader>
          <div className='px-4'>
            <AddExerciseForm
              defaultValues={{ date: toDate(day) }}
              onSuccess={() => setOpenAddExercise(false)}
              optimisticUpdate={(data:SchedulePopulated)=>addOptimisticData({action:'add',data})}
            />
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

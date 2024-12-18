'use client';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { DialogClose } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { AddScheduleForm } from './add-schedule-form';
import { ScheduleDay } from './schedule-day';
import { GroupedSets, SchedulePopulated } from '@/type';
import { editScheduleSchema } from '@/schema/schedule.schema';
import { formatSecondsToHHMMSS } from '@/lib/utils';
import { EditScheduleForm } from './edit-schedule-form';
import { isEqual, startOfDay } from 'date-fns';
import { CopyScheduleForm } from './copy-schedule-form';

interface ScheduleListProps {
  data: {
    date: Date;
    schedule: SchedulePopulated[];
  }[];
}

export const ScheduleList = ({ data }: ScheduleListProps) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openCopy, setOpenCopy] = useState(false);
  const [defaultDate, setDefaultDate] = useState<Date>();
  const [defaultEditing, setDefaultEditing] =
    useState<Zod.infer<typeof editScheduleSchema>>();
  const [scheduleToCopy, setScheduleToCopy] = useState<{
    date: Date;
    scheduleIds: string[];
  }>();

  const openAddDrawer = (date?: Date) => {
    setDefaultDate(date);
    setOpenAdd(true);
  };

  const openEditDrawer = (scheduleId: string) => {
    const schedule = data
      .reduce((acc, item) => {
        acc = [...acc, ...item.schedule];
        return acc;
      }, [] as SchedulePopulated[])
      .find((item) => item.id === scheduleId);

    if (!schedule) return;

    const sets = schedule.exerciseSets.map((item) => ({
      reps: item.reps.toString(),
      weight: item.weight.toString(),
      duration: formatSecondsToHHMMSS(item.duration),
    }));

    const groupedSets: GroupedSets = [];

    for (const set of sets) {
      const inGroup = groupedSets.findIndex(
        (item) =>
          item.weight === set.weight &&
          item.reps &&
          item.duration === set.duration
      );
      if (inGroup === -1) {
        groupedSets.push({
          sets: '1',
          ...set,
        });
      } else {
        groupedSets[inGroup] = {
          ...groupedSets[inGroup],
          sets: (Number(groupedSets[inGroup].sets) + 1).toString(),
        };
      }
    }

    setDefaultEditing({
      scheduleId: schedule.id,
      exerciseId: schedule.exerciseId,
      date: schedule.date,
      sets: groupedSets,
    });
    setOpenEdit(true);
  };

  const openCopyDrawer = (date: Date) => {
    date = startOfDay(date);
    const daySchedule = data.find((item) =>
      isEqual(startOfDay(item.date), date)
    );
    if (!daySchedule) return;
    const scheduleIds = daySchedule?.schedule.reduce((acc, item) => {
      acc.push(item.id);
      return acc;
    }, [] as string[]);
    setScheduleToCopy({
      date,
      scheduleIds,
    });
    setOpenCopy(true);
  };

  if (data.length === 0)
    return <div className='flex-1'>Problem retrieving schedule</div>;
  return (
    <>
      <div className='flex flex-1 flex-col overflow-y-auto'>
        <div className='max-h-0 space-y-6'>
          {data.map((day) => (
            <ScheduleDay
              key={day.date.toDateString()}
              date={day.date}
              schedule={day.schedule}
              addSchedule={() => openAddDrawer(day.date)}
              editSchedule={openEditDrawer}
              copyScheduleDay={() => openCopyDrawer(day.date)}
            />
          ))}
        </div>
      </div>
      <Drawer open={openAdd} onOpenChange={setOpenAdd}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Schedule an exercise</DrawerTitle>
            <DrawerDescription>
              select an exercise and choose what day you want it on, you can
              change this later
            </DrawerDescription>
          </DrawerHeader>
          <div className='px-4'>
            <AddScheduleForm
              defaultValues={{ date: defaultDate }}
              onSuccess={() => setOpenAdd(false)}
            />
          </div>
          <DrawerFooter>
            <DialogClose asChild>
              <Button variant={'outline'}>Cancel</Button>
            </DialogClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer open={openEdit} onOpenChange={setOpenEdit}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit Scheduled exercise</DrawerTitle>
            <DrawerDescription>Only sets can be edited</DrawerDescription>
          </DrawerHeader>
          <div className='px-4'>
            <EditScheduleForm
              defaultValues={defaultEditing}
              onSuccess={() => setOpenEdit(false)}
            />
          </div>
          <DrawerFooter>
            <DialogClose asChild>
              <Button variant={'outline'}>Cancel</Button>
            </DialogClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer open={openCopy} onOpenChange={setOpenCopy}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Copy exercise</DrawerTitle>
            <DrawerDescription>
              All scheduled exercies from this day will be copied to specified
              day
            </DrawerDescription>
          </DrawerHeader>
          <div className='px-4'>
            <CopyScheduleForm
              defaultValues={scheduleToCopy}
              onSuccess={() => setOpenCopy(false)}
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

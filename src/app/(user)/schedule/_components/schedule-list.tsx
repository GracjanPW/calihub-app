"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  ExerciseSet,
  Schedule,
} from "@prisma/client";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { AddScheduleForm } from "./add-schedule-form";
import { ScheduleDay } from "./schedule-day";
import { ExerciseWithLabel } from "@/type";

interface ScheduleListProps {
  data: {
    date: Date;
    schedule: (Schedule & {
      exercise: ExerciseWithLabel;
      exerciseSets: Pick<
        ExerciseSet,
        "order" | "reps" | "weight" | "duration"
      >[];
    })[];
  }[];
}

export const ScheduleList = ({ data }: ScheduleListProps) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [defaultDate, setDefaultDate] = useState<Date>();

  const openAddDrawer = (date?: Date) => {
    setDefaultDate(date);
    setOpenAdd(true);
  };

  if (data.length === 0)
    return <div className="flex-1">Problem retrieving schedule</div>;
  return (
    <>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="max-h-0 space-y-6">
          {data.map((day) => (
            <ScheduleDay
              key={day.date.toDateString()}
              date={day.date}
              schedule={day.schedule}
              addSchedule={() => openAddDrawer(day.date)}
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
          <div className="px-4">
            <AddScheduleForm
              defaultValues={{ date: defaultDate }}
              onSuccess={() => setOpenAdd(false)}
            />
          </div>
          <DrawerFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

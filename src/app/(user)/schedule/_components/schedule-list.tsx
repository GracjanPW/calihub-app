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
import { Exercise, Schedule } from "@prisma/client";
import { DialogClose } from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { useState } from "react";
import { AddScheduleForm } from "./add-schedule-form";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

// TODO: select date automatically for add schedule

interface ScheduleListProps {
  data: {
    date: Date;
    schedule: (Schedule & { exercise: Pick<Exercise, "name"> })[];
  }[];
}

export const ScheduleList = ({ data }: ScheduleListProps) => {
  const [openAdd, setOpenAdd] = useState(false);

  if (data.length === 0) return <div>Problem retrieving schedule</div>;
  return (
    <>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="max-h-0 space-y-4">
          {data.map((day, i) => (
            <div key={day.date.toDateString()}>
              <div className="flex justify-between">
                <p className="text-lg font-semibold">
                  {format(day.date, "EEEE")}
                </p>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  onClick={() => setOpenAdd(true)}
                >
                  <Plus />
                </Button>
              </div>
              <Separator className="my-1" />
              <ul className="space-y-2 mb-2">
                {day.schedule.length === 0 && (
                  <div className="bg-slate-300 rounded-md p-4">
                    No exercies scheduled, you can rest 🥺
                  </div>
                )}
                {day.schedule.map((schedule, j) => (
                  <div key={`${i}-${j}`} className="bg-muted p-1 rounded-md ">
                    {schedule.exercise.name}
                  </div>
                ))}
              </ul>
            </div>
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
            <AddScheduleForm onSuccess={() => setOpenAdd(false)} />
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

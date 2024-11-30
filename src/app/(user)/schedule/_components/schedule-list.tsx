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
import { ScheduleDay } from "./schedule-day";

// TODO: select date automatically for add schedule

interface ScheduleListProps {
  data: {
    date: Date;
    schedule: (Schedule & { exercise: Pick<Exercise, "name"> })[];
  }[];
}

export const ScheduleList = ({ data }: ScheduleListProps) => {
  const [openAdd, setOpenAdd] = useState(false);

  if (data.length === 0) return <div className="flex-1">Problem retrieving schedule</div>;
  return (
    <>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="max-h-0 space-y-4">
          {data.map((day, i) => (
            <ScheduleDay key={day.date.toDateString()} date={day.date} schedule={day.schedule} addSchedule={()=>setOpenAdd(true)} />
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
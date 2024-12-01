"use client"
import { deleteSchedule } from "@/actions/schedule/delete-schedule";
import { Button } from "@/components/ui/button";
import { Exercise, Schedule } from "@prisma/client";
import { Trash } from "lucide-react";

interface ScheduleItemProps {
  data: Schedule & { exercise: Pick<Exercise, "name"> };
}

export const ScheduleItem = ({ data }: ScheduleItemProps) => {
  const deleteScheduleWithId = deleteSchedule.bind(null, data.id)

  return (
    <div
      key={data.id}
      className="bg-neutral-100 p-2 pl-4 rounded-md text-neutral-700 font-medium flex items-center justify-between"
    >
      {data.exercise.name}
      <form>
        <Button variant={'ghost'} size={'icon'} formAction={deleteScheduleWithId}>
          <Trash/>
        </Button>
      </form>
    </div>
  );
};

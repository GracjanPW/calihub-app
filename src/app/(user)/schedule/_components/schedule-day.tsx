import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Exercise, Schedule } from "@prisma/client";
import { format } from "date-fns";
import { ChevronDown, ChevronLeft, Plus } from "lucide-react";
import { useState } from "react";

interface ScheduleDayProps {
  date: Date;
  schedule: (Schedule & { exercise: Pick<Exercise, "name"> })[];
  addSchedule: () => void;
}

export const ScheduleDay = ({
  date,
  schedule,
  addSchedule,
}: ScheduleDayProps) => {
  const [full,setFull] = useState(false)
  return (
    <div key={date.toDateString()}>
      <div className="flex justify-between items-center">
        <Button onClick={()=>setFull((prev)=>!prev)} variant={'ghost'} className="text-xl font-bold text-neutral-700 flex items-center" >
          <ChevronDown className={cn("mr-1 transition",full && "rotate-90")}/>
          {format(date, "EEEE")}
        </Button>
        <Button variant={"outline"} size={"icon"} onClick={addSchedule}>
          <Plus className="text-neutral-800" />
        </Button>
      </div>
      <Separator className="my-1 mb-2 bg-slate-400" />
      <div className={cn("space-y-2 mb-2",full?"":"space-x-2")}>
        {schedule.length === 0 && (
          <div className="bg-neutral-300 border border-neutral-700 text-center text-neutral-800 rounded-md p-4">
            No exercies scheduled
          </div>
        )}
        {
          !full && schedule.map((schedule)=>(
            <Badge key={schedule.id} variant={'outline'} className="text-md">{schedule.exercise.name}</Badge>
          ))
        }
        {full && schedule.map((schedule) => (
          <div
            key={schedule.id}
            className="bg-neutral-200 p-1 px-4 rounded-md text-neutral-700 font-medium"
          >
            {schedule.exercise.name}
          </div>
        ))}
      </div>
    </div>
  );
};

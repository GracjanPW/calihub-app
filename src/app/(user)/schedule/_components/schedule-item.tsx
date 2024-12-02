"use client";
import { deleteSchedule } from "@/actions/schedule/delete-schedule";
import { Button } from "@/components/ui/button";
import { Exercise, ExerciseSet, Schedule } from "@prisma/client";
import { Trash } from "lucide-react";

interface ScheduleItemProps {
  data: Schedule & {
    exercise: Pick<Exercise, "name">;
    exerciseSets: Pick<ExerciseSet, "order" | "reps" | "weight" | "duration">[];
  };
}

export const ScheduleItem = ({ data }: ScheduleItemProps) => {
  const deleteScheduleWithId = deleteSchedule.bind(null, data.id);

  return (
    <div
      key={data.id}
      className="bg-neutral-100 p-2 pl-4 rounded-md text-neutral-700 font-medium flex flex-col"
    >
      <div className="flex items-center justify-between">
        {data.exercise.name}
        <form>
          <Button
            variant={"ghost"}
            size={"icon"}
            formAction={deleteScheduleWithId}
          >
            <Trash />
          </Button>
        </form>
      </div>
      {data.exerciseSets.length > 0 && (
        <ul>
          {data.exerciseSets.map((set) => (
            // TODO: data.exerciseId should be data.order, to be added
            <li
              key={`${data.id}-${data.exerciseId}-${set.order}`}
              className="text-muted-foreground text-sm ml-2"
            >
              {set.order + 1}:{" "}
              {Number(set.weight) > 0 ? set.weight + "kg " : null}
              {Number(set.reps) > 0
                ? (Number(set.weight) > 0 ? "for " : "") + set.reps + " reps "
                : null}
              {Number(set.duration) > 0
                ? (Number(set.reps) > 0 || Number(set.weight) > 0
                    ? "for "
                    : "") +
                  set.duration +
                  "s"
                : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

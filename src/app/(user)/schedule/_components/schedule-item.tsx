"use client";
import { deleteSchedule } from "@/actions/schedule/delete-schedule";
import { Button } from "@/components/ui/button";
import {
  Exercise,
  ExerciseLabel,
  ExerciseSet,
  Label,
  Schedule,
} from "@prisma/client";
import chroma from "chroma-js";
import { Trash } from "lucide-react";

interface ScheduleItemProps {
  data: Schedule & {
    exercise: Pick<Exercise, "name"> & {
      exerciseLabels: (ExerciseLabel & { label: Label })[];
    };
    exerciseSets: Pick<ExerciseSet, "order" | "reps" | "weight" | "duration">[];
  };
}

export const ScheduleItem = ({ data }: ScheduleItemProps) => {
  const deleteScheduleWithId = deleteSchedule.bind(null, data.id);

  return (
    <div
      key={data.id}
      className="bg-neutral-100 p-2 pb-4 pl-4 rounded-md text-neutral-700 font-medium flex flex-col"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {data.exercise.name}
          <div className="ml-1 flex space-x-1">
            {data.exercise.exerciseLabels.map(({ label }) => (
              <div
                key={`${label.name}-${label.color}`}
                style={{ backgroundColor: chroma(label.color).css() }}
                className="size-2 rounded-full"
              />
            ))}
          </div>
        </div>
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

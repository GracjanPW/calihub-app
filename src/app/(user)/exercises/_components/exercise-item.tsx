import { deleteExercise } from "@/actions/exercises/delete-exercise";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExerciseWithLabel } from "@/type";
import { Exercise, ExerciseLabel, Label } from "@prisma/client";
import chroma from "chroma-js";
import { Edit, Trash } from "lucide-react";

interface ExerciseItemProps {
  data: ExerciseWithLabel;
  onClick: () => void;
}

export const ExerciseItem = ({ data, onClick }: ExerciseItemProps) => {
  const deleteExerciseWithId = deleteExercise.bind(null, data.id);
  return (
    <div className="bg-neutral-100  pl-4 p-2 rounded-md ">
      <div className="flex items-center">
        <p className="text-neutral-600 text-lg font-semibold">{data.name}</p>
        <div className="ml-auto flex">
          <Button variant={"ghost"} size={"icon"} onClick={onClick}>
            <Edit className="" />
          </Button>
          <form>
            <Button
              variant={"ghost"}
              size={"icon"}
              formAction={deleteExerciseWithId}
            >
              <Trash />
            </Button>
          </form>
        </div>
      </div>
      <div className="items-center space-x-2 space-y-2 w-full">
        {data.exerciseLabels.map(({ label }) => (
          <Badge
            key={label.id}
            style={{
              backgroundColor: chroma(label.color).alpha(0.1).css(),
              color: chroma(label.color).css(),
            }}
          >
            {label.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

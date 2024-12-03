import { Badge } from "@/components/ui/badge";
import { Exercise, ExerciseLabel, Label } from "@prisma/client";
import chroma from "chroma-js";

interface ExerciseItemProps {
  data: Exercise & { exerciseLabels: (ExerciseLabel & { label: Label })[] };
}

export const ExerciseItem = ({ data }: ExerciseItemProps) => {
  return (
    <div className="bg-neutral-100  px-4 p-2 rounded-md ">
      <p className="text-neutral-600 text-lg font-semibold">{data.name}</p>
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

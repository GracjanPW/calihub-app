import { Exercise, ExerciseLabel, Label } from "@prisma/client";
import { ExerciseItem } from "./exercise-item";

interface ExerciseListProps {
  data: (Exercise & { exerciseLabels: (ExerciseLabel & { label: Label })[] })[];
}

export const ExerciseList = ({ data }: ExerciseListProps) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="h-0 space-y-4">
        {data.map((exercise) => (
          <ExerciseItem key={exercise.id} data={exercise} />
        ))}
      </div>
    </div>
  );
};

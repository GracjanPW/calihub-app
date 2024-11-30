import { Exercise } from "@prisma/client";

interface ExerciseItemProps {
  data: Pick<Exercise, "id" | "name">;
}

export const ExerciseItem = ({ data }: ExerciseItemProps) => {
  return (
    <div className="bg-neutral-100 text-neutral-600 px-4 p-2 rounded-md text-lg font-semibold">
      {data.name}
    </div>
  );
};

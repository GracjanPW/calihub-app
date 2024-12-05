"use client";

import { ExerciseItem } from "./exercise-item";
import { EditExerciseDrawer } from "./edit-exercise-drawer";
import { useState } from "react";
import { ExerciseWithLabel } from "@/type";

interface ExerciseListProps {
  data: ExerciseWithLabel[];
}

export const ExerciseList = ({ data }: ExerciseListProps) => {
  const [open, setOpen] = useState(false);
  const [openedExercise, setOpenedExercise] = useState<ExerciseWithLabel>();

  const openExerciseEdit = (id: string) => {
    const exercise = data.find((exercise) => exercise.id === id);
    setOpenedExercise(exercise as ExerciseWithLabel);
    setOpen(true);
  };

  const closeExerciseEdit = () => {
    setOpen(false);
    setOpenedExercise(undefined);
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <div className="h-0 space-y-4">
          {data.map((exercise) => (
            <ExerciseItem
              key={exercise.id}
              data={exercise}
              onClick={() => openExerciseEdit(exercise.id)}
            />
          ))}
        </div>
      </div>
      <EditExerciseDrawer
        data={openedExercise}
        open={open}
        close={closeExerciseEdit}
      />
    </>
  );
};

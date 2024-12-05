import { Exercise, ExerciseLabel, Label } from "@prisma/client";

export type ExerciseWithLabel = Exercise & {
  exerciseLabels: (ExerciseLabel & { label: Label })[];
};

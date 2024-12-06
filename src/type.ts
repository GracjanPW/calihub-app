import {
  Exercise,
  ExerciseLabel,
  ExerciseSet,
  Label,
  Schedule,
} from "@prisma/client";

export type ExerciseWithLabel = Exercise & {
  exerciseLabels: (ExerciseLabel & { label: Label })[];
};

export type SchedulePopulated = Schedule & {
  exercise: ExerciseWithLabel;
  exerciseSets: ExerciseSet[];
};

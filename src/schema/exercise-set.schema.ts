import { z } from 'zod';
const refineIsNumber = (v: string) => !isNaN(Number(v));
const refineIsTimeString = (v: string) => /^\d{2}:\d{2}:\d{2}$/.test(v);

export const updateExerciseSetSchema = z.object({
  id: z.string(),

  completedWeight: z
    .string()
    .refine(refineIsNumber, { message: 'Invalid number' }),
  completedReps: z
    .string()
    .refine(refineIsNumber, { message: 'Invalid number' }),
  completedDuration: z
    .string()
    .refine(refineIsTimeString, { message: 'Invalid number' }),
});

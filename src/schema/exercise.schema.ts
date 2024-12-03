import { z } from "zod";

export const addExerciseSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  labels: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
      color: z.string(),
    })
  ),
});

import { z } from "zod";

export const exerciseAddSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  labels: z.array(z.string()),
});

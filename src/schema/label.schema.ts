import { z } from "zod";

export const addLabelSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  color: z.string().min(1, {
    message: "Label color is required",
  }),
});
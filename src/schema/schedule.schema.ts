import { z } from "zod";

const refineIsNumber = (v:string) => !isNaN(Number(v))


export const AddScheduleSchema = z.object({
  exerciseId: z.string().min(1, {
    message: "Exercise required",
  }),
  date: z.date({
    required_error: "Date required",
  }),
  sets: z.array(
    z
      .object({
        sets: z.string().refine(refineIsNumber,{message:"Invalid Number"}
        ).refine((v) => {
          return Number(v) >=1
        },
        { message: "Must have at least one set" },),
        weight: z.string().refine(
          refineIsNumber,
          { message: "Invalid number" }
        ),
        reps: z.string().refine(
          refineIsNumber,
          { message: "Invalid number" }
        ),
        duration: z.string().refine(
          refineIsNumber,
          { message: "Invalid number" }
        ),
      })
      .refine((v) => {
        const w = Number(v.weight);
        const r = Number(v.reps);
        const d = Number(v.duration);

        if (w > 0 || r > 0 || d>0) return true
      },
    {
      message:"Must have a value above 0 for at leat one field (Weight, Reps or Duration)",
      path:['weight','reps','duration']
    })
  ),
});

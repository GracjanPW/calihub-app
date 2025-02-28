import { z } from 'zod';

const refineIsNumber = (v: string) => !isNaN(Number(v));
const refineIsTimeString = (v: string) => /^\d{2}:\d{2}:\d{2}$/.test(v);

export const addScheduleSchema = z.object({
  exerciseId: z.string().min(1, {
    message: 'Exercise required',
  }),
  date: z.date({
    required_error: 'Date required',
  }),
  sets: z.array(
    z
      .object({
        sets: z
          .string()
          .refine(refineIsNumber, { message: 'Invalid Number' })
          .refine(
            (v) => {
              return Number(v) >= 1;
            },
            { message: 'Must have at least one set' }
          ),
        weight: z
          .string()
          .refine(refineIsNumber, { message: 'Invalid number' }),
        reps: z.string().refine(refineIsNumber, { message: 'Invalid number' }),
        duration: z
          .string()
          .refine(refineIsTimeString, { message: 'Invalid number' }),
      })
      .refine(
        (v) => {
          const w = Number(v.weight);
          const r = Number(v.reps);
          const [hh, mm, ss] = v.duration.split(':');
          const d = Number(hh) + Number(mm) + Number(ss);

          if (w > 0 || r > 0 || d > 0) return true;
        },
        {
          message:
            'Must have a value above 0 for at leat one field (Weight, Reps or Duration)',
          path: ['weight', 'reps', 'duration'],
        }
      )
  ),
});

export const editScheduleSchema = z.object({
  scheduleId: z.string().min(1, {
    message: 'Schedule Id required',
  }),
  exerciseId: z.string().min(1, {
    message: 'Exercise required',
  }),
  date: z.date({
    required_error: 'Date required',
  }),
  sets: z.array(
    z
      .object({
        sets: z
          .string()
          .refine(refineIsNumber, { message: 'Invalid Number' })
          .refine(
            (v) => {
              return Number(v) >= 1;
            },
            { message: 'Must have at least one set' }
          ),
        weight: z
          .string()
          .refine(refineIsNumber, { message: 'Invalid number' }),
        reps: z.string().refine(refineIsNumber, { message: 'Invalid number' }),
        duration: z
          .string()
          .refine(refineIsTimeString, { message: 'Invalid number' }),
      })
      .refine(
        (v) => {
          const w = Number(v.weight);
          const r = Number(v.reps);
          const [hh, mm, ss] = v.duration.split(':');
          const d = Number(hh) + Number(mm) + Number(ss);

          if (w > 0 || r > 0 || d > 0) return true;
        },
        {
          message:
            'Must have a value above 0 for at leat one field (Weight, Reps or Duration)',
          path: ['weight', 'reps', 'duration'],
        }
      )
  ),
});

export const copyScheduleSchema = z.object({
  date: z.date({
    required_error: 'Date required',
  }),
  scheduleIds: z
    .array(z.string())
    .min(1, 'Must copy at least one scheduled exercise'),
});

'use server';

import { getUser } from '@/lib/auth/get-user';
import { db } from '@/lib/db';
import { HhMmSsToSeconds, separateSets } from '@/lib/utils';
import { addScheduleSchema } from '@/schema/schedule.schema';
import { isBefore, startOfDay, toDate } from 'date-fns';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function addSchedule(values: z.infer<typeof addScheduleSchema>) {
  const user = await getUser();
  if (!user || !user.id) throw new Error('Unauthorized');

  const { data } = addScheduleSchema.safeParse(values);

  if (!data) throw new Error('Invalid input types');
  if (isBefore(startOfDay(toDate(data.date)), startOfDay(new Date())))
    throw new Error('Can not schedule workouts in the past');

  const dbReadyData = {
    ...data,
    sets: separateSets(data.sets).map((set, i) => {
      const weight = Math.floor(Number(set.weight) * 1000);
      const duration = HhMmSsToSeconds(set.duration);

      const reps = Number(set.reps);
      const order = i;
      const exerciseId = data.exerciseId;
      return {
        weight,
        reps,
        duration,
        order,
        exerciseId,
      };
    }),
  };

  const existingExercise = await db.exercise.findUnique({
    where: {
      userId: user.id,
      id: data.exerciseId,
    },
  });
  if (!existingExercise) throw new Error("Exercise doesn't exist");

  const lastSchedule = await db.schedule.findFirst({
    where: {
      userId: user.id,
      date: dbReadyData.date,
    },
    orderBy: {
      order: 'desc',
    },
  });

  const schedule = await db.schedule.create({
    data: {
      userId: user.id,
      exerciseId: dbReadyData.exerciseId,
      date: dbReadyData.date,
      order: lastSchedule ? lastSchedule.order + 1 : 0,
      exerciseSets: {
        createMany: {
          data: dbReadyData.sets,
        },
      },
    },
  });

  if (!schedule) throw new Error('Something went wrong');

  // TODO: revalidate specific
  revalidatePath('/schedule');
  return schedule.id;
}

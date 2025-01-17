'use server';

import { getUser } from '@/lib/auth/get-user';
import { db } from '@/lib/db';
import { HhMmSsToSeconds } from '@/lib/utils';
import { addExerciseSetSchema } from '@/schema/exercise-set.schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function addSet(values: z.infer<typeof addExerciseSetSchema>) {
  const user = await getUser();
  if (!user || !user.id) throw new Error('Unauthorized');

  const { data, success } = addExerciseSetSchema.safeParse(values);

  if (!success) return new Error('Invalid values given');

  const schedule = await db.schedule.findUnique({
    where: {
      id: data.scheduleId,
      userId: user.id,
    },
    select: {
      id: true,
      exerciseId: true,
      exerciseSets: {
        select: {
          order: true,
        },
        take: 1,
        orderBy: {
          order: 'desc',
        },
      },
    },
  });
  if (!schedule) throw new Error('Exercise set not found');

  const weight = Number(data.weight) * 1000;
  const duration = HhMmSsToSeconds(data.duration);
  const reps = Number(data.reps);
  const completed = data.completed;
  const order =
    schedule.exerciseSets.length === 1 ? schedule.exerciseSets[0].order + 1 : 0;

  const updatedSchedule = await db.exerciseSet.create({
    data: {
      exerciseId: schedule.exerciseId,
      scheduleId: schedule.id,
      weight,
      duration,
      reps,
      completed,
      completedWeight: completed ? weight : 0,
      completedDuration: completed ? duration : 0,
      completedReps: completed ? reps : 0,
      order,
    },
  });

  if (!updatedSchedule) return new Error('Something went wrong');

  revalidatePath('/workout/');
  return updatedSchedule;
}

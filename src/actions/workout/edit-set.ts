'use server';

import { getUser } from '@/lib/auth/get-user';
import { db } from '@/lib/db';
import { HhMmSsToSeconds } from '@/lib/utils';
import { updateExerciseSetSchema } from '@/schema/exercise-set.schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function completeSet(id: string, formData: FormData) {
  const user = await getUser();
  if (!user || !user.id) throw new Error('Unauthorized');

  const existingSet = await db.exerciseSet.findUnique({
    where: {
      id,
      exercise: {
        userId: user.id,
      },
    },
  });
  if (!existingSet) throw new Error('Exercise set not found');

  let updated = null;
  if (existingSet.completed) {
    updated = await db.exerciseSet.update({
      where: {
        id: existingSet.id,
      },
      data: {
        completed: false,
        completedDuration: null,
        completedReps: null,
        completedWeight: null,
      },
    });
  } else {
    updated = await db.exerciseSet.update({
      where: {
        id: existingSet.id,
      },
      data: {
        completedDuration: existingSet.duration,
        completedReps: existingSet.reps,
        completedWeight: existingSet.weight,
        completed: true,
      },
    });
  }
  if (!updated) throw new Error('Something went wrong');
  revalidatePath(`/workout/`);
}

export async function editSet(values: z.infer<typeof updateExerciseSetSchema>) {
  const user = await getUser();
  if (!user || !user.id) throw new Error('Unauthorized');

  const { data, success } = updateExerciseSetSchema.safeParse(values);

  if (!success) return new Error('Invalid values given');

  const existingSet = await db.exerciseSet.findUnique({
    where: {
      id: data.id,
      exercise: {
        userId: user.id,
      },
    },
  });
  if (!existingSet) throw new Error('Exercise set not found');

  const updated = await db.exerciseSet.update({
    where: {
      id: existingSet.id,
    },
    data: {
      completedWeight: Number(data.completedWeight) * 1000,
      completedReps: Number(data.completedReps),
      completedDuration: HhMmSsToSeconds(data.completedDuration),
      completed: true,
    },
  });

  if (!updated) return new Error('Something went wrong');

  revalidatePath('/workout/');
  return updated;
}

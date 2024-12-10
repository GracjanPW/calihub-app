'use server';

import { getUser } from '@/lib/auth/get-user';
import { db } from '@/lib/db';
import { addExerciseSchema } from '@/schema/exercise.schema';
import { Label } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function addExercise(values: z.infer<typeof addExerciseSchema>) {
  const user = await getUser();
  if (!user || !user.id) throw new Error('Unauthorized');

  const { data } = addExerciseSchema.safeParse(values);

  if (!data) throw new Error('Invalid fields');

  let labels: Label[] = [];
  if (data.labels.length > 0) {
    labels = await db.label.findMany({
      where: {
        userId: user.id,
        id: {
          in: data.labels.reduce<string[]>((a, c) => {
            return [...a, c.value];
          }, []),
        },
      },
    });
    if (!labels) throw new Error('Labels dont exist');
  }

  const exercise = await db.exercise.create({
    data: {
      name: data.name,
      userId: user.id,
      exerciseLabels: {
        createMany: {
          data: labels.map((label) => ({ labelId: label.id })),
        },
      },
    },
  });

  if (!exercise) throw new Error('Failed to create exercise');

  revalidatePath('/exercises');
  return exercise;
}

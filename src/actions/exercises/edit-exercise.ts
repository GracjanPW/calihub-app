'use server';
import { getUser } from '@/lib/auth/get-user';
import { db } from '@/lib/db';
import { editExerciseSchema } from '@/schema/exercise.schema';
import { Label } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function editExercise(values: z.infer<typeof editExerciseSchema>) {
  const user = await getUser();
  if (!user || !user.id) throw new Error('Unauthorized');

  const { data, success } = editExerciseSchema.safeParse(values);

  if (!success) throw new Error('Invalid fields');

  const exists = await db.exercise.findUnique({
    where: {
      id: data.id,
      userId: user.id,
    },
  });
  if (!exists) throw new Error('Exercise not found');

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
    if (labels.length !== data.labels.length)
      throw new Error('Labels dont exist');
  }
  // TODO: check if better way of updating array rather then deleting all and then creating new
  const updatedExercise = await db.exercise.update({
    where: {
      id: data.id,
      userId: user.id,
    },
    data: {
      exerciseLabels: {
        deleteMany: {},
        createMany: {
          data: labels.map((label) => ({
            labelId: label.id,
          })),
        },
      },
    },
  });

  if (!updatedExercise) throw new Error('Failed to update exercise');

  revalidatePath('/exercises');
  return updatedExercise;
}

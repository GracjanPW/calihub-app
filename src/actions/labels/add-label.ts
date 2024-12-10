'use server';

import { getUser } from '@/lib/auth/get-user';
import { db } from '@/lib/db';
import { addLabelSchema } from '@/schema/label.schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function addLabel(values: z.infer<typeof addLabelSchema>) {
  const user = await getUser();
  if (!user || !user.id) throw new Error('Unauthorized');

  const { data } = addLabelSchema.safeParse(values);

  if (!data) throw new Error('Invalid input types');

  const existingExercise = await db.label.findFirst({
    where: {
      userId: user.id,
      name: data.name,
    },
  });

  if (existingExercise) throw new Error('Label with this name already exists');

  const newLabel = await db.label.create({
    data: {
      userId: user.id,
      ...data,
    },
  });

  if (!newLabel) throw new Error('Something went wrong');

  revalidatePath('/labels');

  return newLabel;
}

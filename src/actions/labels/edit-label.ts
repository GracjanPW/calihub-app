'use server';

import { getUser } from '@/lib/auth/get-user';
import { db } from '@/lib/db';
import { editLabelSchema } from '@/schema/label.schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function editLabel(values: z.infer<typeof editLabelSchema>) {
  const user = await getUser();
  if (!user || !user.id) throw new Error('Unauthorized');

  const parsedData = editLabelSchema.safeParse(values);

  if (!parsedData.success) throw new Error('Invalid input types');

  const { data } = parsedData;

  const existingLabel = await db.label.findFirst({
    where: {
      id: data.id,
      userId: user.id,
    },
  });

  if (!existingLabel) throw new Error('Label not found');

  const { name, color } = data;

  const updatedLabel = await db.label.update({
    where: {
      id: existingLabel.id,
      userId: user.id,
    },
    data: {
      name,
      color,
    },
  });

  if (!updatedLabel) throw new Error('Something went wrong');

  revalidatePath('/labels');

  return updatedLabel;
}

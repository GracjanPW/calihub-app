'use server';

import { getUser } from '@/lib/auth/get-user';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteLabel(id: string) {
  const user = await getUser();
  if (!user) throw new Error('Unauthorized');

  await db.label.delete({
    where: {
      id,
      userId: user.id,
    },
  });

  revalidatePath('/labels');
}

'use server';

import { getUser } from '@/lib/auth/get-user';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteSchedule(id: string) {
  const user = await getUser();
  if (!user) return;

  await db.schedule.delete({
    where: {
      id,
      userId: user.id,
    },
  });

  revalidatePath('/schedule');
}

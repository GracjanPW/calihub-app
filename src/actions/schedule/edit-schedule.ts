'use server';

import { getUser } from '@/lib/auth/get-user';
import { db } from '@/lib/db';
import { separateSets } from '@/lib/utils';
import { editScheduleSchema } from '@/schema/schedule.schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function editSchedule(values: z.infer<typeof editScheduleSchema>) {
  const user = await getUser();
  if (!user || !user.id) throw new Error('Unauthorized');

  const { data } = editScheduleSchema.safeParse(values);

  if (!data) throw new Error('Invalid input types');

  const existingSchedule = await db.schedule.findUnique({
    where: {
      userId: user.id,
      id: data.scheduleId,
      exerciseId: data.exerciseId,
    },
  });

  if (!existingSchedule) throw new Error('Schedule not found');

  const dbReadyData = {
    ...data,
    sets: separateSets(data.sets).map((set, i) => {
      const weight = Math.floor(Number(set.weight) * 1000);
      const [hh, mm, ss] = set.duration.split(':');
      const secondsInHH = Number(hh) * 60 * 60;
      const secondsInMM = Number(mm) * 60;
      const seconds = Number(ss);
      const duration = secondsInHH + secondsInMM + seconds;

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

  const schedule = await db.schedule.update({
    where: {
      userId: user.id,
      id: data.scheduleId,
      exerciseId: data.exerciseId,
    },
    data: {
      exerciseSets: {
        deleteMany: {},
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

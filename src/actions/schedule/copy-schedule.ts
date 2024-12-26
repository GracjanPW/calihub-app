'use server';

import { getUser } from '@/lib/auth/get-user';
import { db } from '@/lib/db';
import { separateSets } from '@/lib/utils';
import { copyScheduleSchema } from '@/schema/schedule.schema';
import { isBefore, startOfDay, toDate } from 'date-fns';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function copySchedule(values: z.infer<typeof copyScheduleSchema>) {
  const user = await getUser();
  if (!user || !user.id) throw new Error('Unauthorized');

  const { data } = copyScheduleSchema.safeParse(values);

  if (!data) throw new Error('Invalid input types');
  if (isBefore(startOfDay(toDate(data.date)), startOfDay(new Date())))
    throw new Error('Can not schedule workouts in the past');
  const schedulesToCopy = await db.schedule.findMany({
    where: {
      userId: user.id,
      id: {
        in: data.scheduleIds,
      },
    },
    include: {
      exerciseSets: true,
    },
    orderBy: {
      order: 'asc',
    },
  });
  if (schedulesToCopy.length !== data.scheduleIds.length)
    throw new Error('Something went wrong retrieving schedules to copy');

  const lastSchedule = await db.schedule.findFirst({
    where: {
      userId: user.id,
      date: data.date,
    },
    orderBy: {
      order: 'desc',
    },
  });

  const schedulesToCopyDataToCopy = schedulesToCopy.map((item, i) => {
    const setsDataToCopy = item.exerciseSets.map((item, i) => {
      return {
        exerciseId: item.exerciseId,
        weight: item.weight,
        duration: item.duration,
        reps: item.reps,
        order: i,
      };
    });
    return {
      exerciseId: item.exerciseId,
      exerciseSets: setsDataToCopy,
      date: data.date,
      userId: user.id!,
      order: lastSchedule ? lastSchedule.order + 1 + i : i,
    };
  });

  const copiedSchedules = await Promise.all(
    schedulesToCopyDataToCopy.map((data) =>
      db.schedule.create({
        data: {
          ...data,
          exerciseSets: {
            createMany: {
              data: data.exerciseSets,
            },
          },
        },
      })
    )
  );

  //   await db.schedule.create({
  //   data: {
  //     userId: user.id,
  //     exerciseId: dbReadyData.exerciseId,
  //     date: dbReadyData.date,
  //     order: lastSchedule ? lastSchedule.order + 1 : 0,
  //     exerciseSets: {
  //       createMany: {
  //         data: dbReadyData.sets,
  //       },
  //     },
  //   },
  // });

  if (!copiedSchedules) throw new Error('Something went wrong');

  // TODO: revalidate specific
  revalidatePath('/schedule');
  return copiedSchedules.length;
}

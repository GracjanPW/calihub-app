/**
 * @function getSchedule
 *
 * @param from - string
 * @param to - string
 */

import { eachDayOfInterval, format, isSameDay, toDate } from 'date-fns';
import { getUser } from '../auth/get-user';
import { db } from '../db';
import { SchedulePopulated } from '@/type';

export async function getScheduleByDate(
  day: string
): Promise<SchedulePopulated[]> {
  const user = await getUser();
  if (!user) return [];
  if (!day) return [];

  const dateOfDay = format(toDate(day), 'yyyy-MM-dd');

  try {
    const schedules = await db.schedule.findMany({
      where: {
        userId: user.id,
        date: new Date(dateOfDay),
      },
      include: {
        exercise: {
          include: {
            exerciseLabels: {
              include: {
                label: true,
              },
            },
          },
        },
        exerciseSets: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });
    return schedules.map((schedule) => ({
      ...schedule,
      exerciseSets: schedule.exerciseSets.map((set) => ({
        ...set,
        weight: set.weight / 1000,
        completedWeight: set.completedWeight
          ? set.completedWeight / 1000
          : null,
      })),
    }));
  } catch {
    return [];
  }
}

/**
 * @param from get schedules from date
 * @type Date string
 *
 * @param to get schedules until date
 * @type Date string
 *
 * @returns list of scheduled workouts between from and to
 */
export async function getSchedule(
  from: string | null | undefined,
  to: string | null | undefined
) {
  try {
    const user = await getUser();
    if (!user) return [];
    if (!from || !to) return [];

    const startDate = toDate(from);
    const endDate = toDate(to);

    const schedules = await db.schedule.findMany({
      where: {
        userId: user.id,
        date: {
          lte: endDate,
          gte: startDate,
        },
      },
      include: {
        exercise: {
          include: {
            exerciseLabels: {
              include: {
                label: true,
              },
            },
          },
        },
        exerciseSets: true,
      },
    });
    const allDays = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });

    const scheduleByday = allDays.map((day) => {
      const foundSchedules = schedules.filter((schedule) =>
        isSameDay(schedule.date, day)
      );
      if (!foundSchedules)
        return {
          date: day,
          schedule: [],
        };
      return {
        date: day,
        schedule: foundSchedules.map((schedule) => ({
          ...schedule,
          exerciseSets: schedule.exerciseSets.map((set) => ({
            ...set,
            weight: set.weight / 1000,
          })),
        })),
      };
    });

    return scheduleByday;
  } catch {
    return [];
  }
}

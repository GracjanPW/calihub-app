/**
 * @function getSchedule
 *
 * @param from - string
 * @param to - string
 */

import {
  eachDayOfInterval,
  endOfDay,
  isSameDay,
  startOfDay,
  toDate,
} from "date-fns";
import { getUser } from "../auth/get-user";
import { db } from "../db";
import { SchedulePopulated } from "@/type";

export async function getScheduleByDate(
  day: string
): Promise<SchedulePopulated[]> {
  const user = await getUser();
  if (!user) return [];
  if (!day) return [];

  const dateOfDay = toDate(day);

  const start = startOfDay(dateOfDay);
  const end = endOfDay(dateOfDay);

  if (!(dateOfDay instanceof Date)) return [];
  try {
    const schedules = await db.schedule.findMany({
      where: {
        userId: user.id,
        date: {
          gte: start,
          lt: end,
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
    return schedules.map((schedule)=> ({
      ...schedule,
      exerciseSets:schedule.exerciseSets.map((set)=>({
        ...set,
        weight:set.weight/1000
      }))
    }) )
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
        exerciseSets: {
          select: {
            weight: true,
            order: true,
            reps: true,
            duration: true,
          },
        },
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
        schedule: foundSchedules.map((schedule)=> ({
          ...schedule,
          exerciseSets:schedule.exerciseSets.map((set)=>({
            ...set,
            weight:set.weight/1000
          }))
        }) ),
      };
    });

    return scheduleByday;
  } catch {
    return [];
  }
}

/**
 * @function getSchedule
 *
 * @param from - string
 * @param to - string
 */

import { eachDayOfInterval, isSameDay, toDate } from "date-fns";
import { getUser } from "../auth/get-user";
import { db } from "../db";

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
          select: {
            name: true,
            exerciseLabels:{
              select:{
                label:{
                  select:{
                    name:true,
                    color:true
                  }
                }
              }
            }
          },
        },
        exerciseSets: {
          select:{
            weight:true,
            order:true,
            reps:true,
            duration:true
          }
        }

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
        schedule: foundSchedules,
      };
    });

    return scheduleByday;
  } catch {
    return [];
  }
}

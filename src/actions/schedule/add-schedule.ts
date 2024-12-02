"use server";

import { getUser } from "@/lib/auth/get-user";
import { db } from "@/lib/db";
import { AddScheduleSchema } from "@/schema/schedule.schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type GroupedSets = {
    sets: string;
    weight: string;
    reps: string;
    duration: string;
}[]

const separateSets = (groupedSets:GroupedSets) =>{
  const ungroupedSets = []
  for (const set of groupedSets) {
    for (let i = 0; i<Number(set.sets);i++){
      ungroupedSets.push({
        reps:set.reps,
        weight:set.weight,
        duration:set.duration
      })
    }
  }
  return ungroupedSets
}

export async function addSchedule(values: z.infer<typeof AddScheduleSchema>) {
  const user = await getUser();
  if (!user || !user.id) throw new Error("Unauthorized");

  const { data } = AddScheduleSchema.safeParse(values);

  if (!data) throw new Error("Invalid input types");

  const dbReadyData = {
    ...data,
    sets: separateSets(data.sets).map((set, i) => {
      const weight = Number(set.weight);
      const duration = Number(set.duration);
      const reps = Number(set.reps)
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

  const existingExercise = await db.exercise.findUnique({
    where: {
      userId: user.id,
      id: data.exerciseId,
    },
  });
  if (!existingExercise) throw new Error("Exercise doesn't exist");

  const schedule = await db.schedule.create({
    data: {
      userId: user.id,
      exerciseId: dbReadyData.exerciseId,
      date: dbReadyData.date,
      exerciseSets: {
        createMany: {
          data: dbReadyData.sets,
        },
      },
    },
  });

  if (!schedule) throw new Error("Something went wrong")

    // TODO: revalidate specific 
  revalidatePath("/schedule")
  return schedule.id
}

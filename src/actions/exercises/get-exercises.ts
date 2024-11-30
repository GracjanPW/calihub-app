"use server"

import { getAllExercises } from "@/lib/db/exercise"

export async function getExercises() {
  return await getAllExercises()
}
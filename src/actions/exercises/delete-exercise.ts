"use server"

import { getUser } from "@/lib/auth/get-user"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function deleteExercise(id:string) {
  const user = await getUser()
  if (!user) throw new Error("Unauthorized")

  await db.exercise.delete({
    where:{
      id,
      userId:user.id
    }
  })

  revalidatePath("/exercise")
  revalidatePath("/schedule")
}
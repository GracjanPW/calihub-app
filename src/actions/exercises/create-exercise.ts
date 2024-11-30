"use server";

import { getUser } from "@/lib/auth/get-user";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

type State = {
  error?:string|null,
  success?:boolean
}

export async function createExercise(prevState:State,formData:FormData):Promise<State> {
  const user = await getUser();
  console.log(user)
  if (!user || !user.id) return {
      error:"Unauthorized"
  }
  
  const name= formData.get("name") as string;
  if (!name) return {
    error:"Name is required"
  }
  
  const exercise = await db.exercise.create({
    data: {
      name,
      userId: user.id
    }
  })
  
  if (!exercise) return {
    error:"Failed to create exercise, try again"
  }

  revalidatePath('/exercises')
  return {
    success:true
  }
}
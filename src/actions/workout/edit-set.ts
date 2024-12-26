"use server";

import { getUser } from "@/lib/auth/get-user";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function completeSet(id:string, formData:FormData) {
    const user = await getUser();
    if (!user || !user.id) throw new Error('Unauthorized');

    const existingSet = await db.exerciseSet.findUnique({
        where:{
            id,
            exercise: {
                userId:user.id
            }
        }
    })
    if (!existingSet) throw new Error("Exercise set not found")


    let updated =null;
    if (existingSet.completed) {
        updated = await db.exerciseSet.update({
            where:{
                id:existingSet.id,
            },
            data:{
                completed:false,
                completedDuration:0,
                completedReps:0,
                completedWeight:0
            }
        })
    } else {
        updated = await db.exerciseSet.update({
            where:{
                id: existingSet.id,
            },
            data:{
                completedDuration: existingSet.duration,
                completedReps: existingSet.completedReps,
                completedWeight: existingSet.completedWeight,
                completed: true
            }
        })   
    }
    if (!updated) throw new Error("Something went wrong")
    revalidatePath(`/workout/`)
}
        
        
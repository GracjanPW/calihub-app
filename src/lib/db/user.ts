import { User } from "@prisma/client"
import { db } from "../db"


/**
 * @function getUserByEmail
 * @param email string
 * 
 * @returns User | null
 */
export async function getUserByEmail(email:string):Promise<User|null> {
  try {
    const user = await db.user.findUnique({
      where:{email}
    })
    return user
  } catch {
    return null
  }
}
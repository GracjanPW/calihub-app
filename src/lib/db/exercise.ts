import { getUser } from "../auth/get-user";
import { db } from "../db";

/**
 * @function getAllExercises
 *
 * @description Gets all exercies belonging to the authenticated user
 */
export async function getAllExercises() {
  try {
    const currentUser = await getUser();
    if (!currentUser) return [];
    const exercises = await db.exercise.findMany({
      where: {
        userId: currentUser.id,
      },
      select: {
        name: true,
        id: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    return exercises;
  } catch {
    return [];
  }
}

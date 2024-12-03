import { getUser } from "../auth/get-user";
import { db } from "../db";

/**
 * @function getLabels
 * 
 * @returns labels belongins to user
 */
export async function getLabels() {
  try {
    const currentUser = await getUser();
    if (!currentUser) return []
    const labels = await db.label.findMany({
      where: {
        userId: currentUser.id,
      },
      orderBy: {
        name: "asc",
      },
    });
    return labels;
  } catch {
    return []
  }
}
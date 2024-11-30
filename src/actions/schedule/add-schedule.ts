"use server";

import { getUser } from "@/lib/auth/get-user";
import { db } from "@/lib/db";
import { toDate } from "date-fns";
import { revalidatePath } from "next/cache";

type State = {
  error: string | null;
  success: boolean;
};

export async function addSchedule(
  prevState: Partial<State>,
  formData: FormData
): Promise<State> {
  const exerciseId = formData.get("exerciseId") as string;
  const dateString = formData.get("date") as string;
  const date = toDate(dateString);
  console.log({ exerciseId, date, dateString });
  if (!date || !exerciseId)
    return {
      error: "Missing required fields",
      success: false,
    };

  const user = await getUser();

  if (!user || !user.id) throw new Error("Unauthorized");

  const schedule = await db.schedule.create({
    data: {
      userId: user.id,
      exerciseId,
      date,
    },
  });

  if (!schedule)
    return {
      error: "Something went wrong, try again",
      success: false,
    };

  revalidatePath("/schedule");
  return {
    error: null,
    success: true,
  };
}

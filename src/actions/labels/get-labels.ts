"use server";
import { getLabels as getLabelsLib } from "@/lib/db/labels";

export async function getLabels() {
  return getLabelsLib();
}

import { clsx, type ClassValue } from "clsx"
import { endOfWeek, startOfWeek } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDateRange = (date: Date) => {
  const from = startOfWeek(date, {
    weekStartsOn: 1,
  }).toDateString();
  const to = endOfWeek(date,{
    weekStartsOn:1
  }).toDateString();
  return {
    from,
    to,
  };
};
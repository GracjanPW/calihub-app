import { SchedulePopulated } from '@/type';
import { clsx, type ClassValue } from 'clsx';
import { endOfWeek, startOfWeek } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDateRange = (date: Date) => {
  const from = startOfWeek(date, {
    weekStartsOn: 1,
  }).toDateString();
  const to = endOfWeek(date, {
    weekStartsOn: 1,
  }).toDateString();
  return {
    from,
    to,
  };
};

export const formatSecondsToHHMMSS = (s: number) => {
  const hours = Math.floor(s / 3600);
  s %= 3600;
  const minutes = Math.floor(s / 60);
  const seconds = s % 60;
  return `${hours > 0 ? `${hours}h` : ''} ${minutes > 0 ? `${minutes}m` : ''} ${seconds > 0 ? `${seconds}s` : ''}`;
};

export function getMostRelavantLabel(schedules: SchedulePopulated[]) {
  const labels = [];
  for (const s of schedules) {
    for (const l of s.exercise.exerciseLabels) {
      labels.push(l.label.name);
    }
  }
  const labelsGrouped = labels.reduce(
    (acc, item) => {
      if (acc[item]) {
        acc[item] += 1;
      } else {
        acc[item] = 1;
      }
      return acc;
    },
    {} as { [key: string]: number }
  );
  const highestKey = Object.keys(labelsGrouped).reduce((a, b) =>
    labelsGrouped[a] > labelsGrouped[b] ? a : b
  );
  return highestKey;
}

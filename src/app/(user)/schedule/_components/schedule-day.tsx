import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  Exercise,
  ExerciseLabel,
  ExerciseSet,
  Label,
  Schedule,
} from '@prisma/client';
import {
  differenceInDays,
  format,
  isBefore,
  startOfDay,
  toDate,
} from 'date-fns';
import { ChevronDown, Copy, Plus } from 'lucide-react';
import { useState } from 'react';
import { ScheduleItem } from './schedule-item';
import chroma from 'chroma-js';

interface ScheduleDayProps {
  date: Date;
  schedule: (Schedule & {
    exercise: Pick<Exercise, 'name'> & {
      exerciseLabels: (ExerciseLabel & { label: Label })[];
    };
    exerciseSets: Pick<ExerciseSet, 'order' | 'reps' | 'weight' | 'duration'>[];
  })[];
  addSchedule: () => void;
  editSchedule: (id: string) => void;
  copyScheduleDay: () => void;
}

export const ScheduleDay = ({
  date,
  schedule,
  addSchedule,
  editSchedule,
  copyScheduleDay,
}: ScheduleDayProps) => {
  const [full, setFull] = useState(false);
  return (
    <div key={date.toDateString()}>
      <div className='flex items-center justify-between'>
        <Button
          onClick={() => setFull((prev) => !prev)}
          variant={'ghost'}
          className='flex items-center text-lg font-bold text-neutral-700 disabled:opacity-100'
          disabled={schedule.length === 0}
        >
          {format(date, 'EEEE, do MMM')}
          {schedule.length > 0 && <ChevronDown
            className={cn('mr-1 transition', full && '-rotate-90', )}
          />}
        </Button>
        <div className='flex space-x-1'>
          <Button
            variant={'outline'}
            size={'icon'}
            onClick={copyScheduleDay}
            disabled={schedule.length === 0}
          >
            <Copy className='text-neutral-800' />
          </Button>
          <Button
            variant={'outline'}
            size={'icon'}
            onClick={addSchedule}
            disabled={isBefore(toDate(date), startOfDay(new Date()))}
          >
            <Plus className='text-neutral-800' />
          </Button>
        </div>
      </div>
      <Separator className='my-1 mb-2 bg-slate-400' />
      <div className={cn('mb-2 space-y-2', full ? '' : 'space-x-2')}>
        {schedule.length === 0 && (
          <div className='rounded-md border font-bold p-4 text-center text-neutral-800'>
            No exercies scheduled
          </div>
        )}
        {!full &&
          schedule.map((schedule) => (
            <Badge
              key={schedule.id}
              variant={'outline'}
              className='text-sm text-neutral-700'
            >
              {schedule.exercise.name}
              <div className='ml-1 flex space-x-1'>
                {schedule.exercise.exerciseLabels.map(({ label }) => (
                  <div
                    key={`${label.name}-${label.color}`}
                    style={{ backgroundColor: chroma(label.color).css() }}
                    className='size-2 rounded-full'
                  />
                ))}
              </div>
            </Badge>
          ))}
        {full &&
          schedule.map((schedule) => (
            <ScheduleItem
              key={schedule.id}
              data={schedule}
              edit={() => editSchedule(schedule.id)}
            />
          ))}
      </div>
    </div>
  );
};

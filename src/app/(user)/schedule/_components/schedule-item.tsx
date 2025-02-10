'use client';
import { deleteSchedule } from '@/actions/schedule/delete-schedule';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatSecondsToHMS } from '@/lib/utils';
import {
  Exercise,
  ExerciseLabel,
  ExerciseSet,
  Label,
  Schedule,
} from '@prisma/client';
import chroma from 'chroma-js';
import { EditIcon, Trash } from 'lucide-react';

interface ScheduleItemProps {
  data: Schedule & {
    exercise: Pick<Exercise, 'name'> & {
      exerciseLabels: (ExerciseLabel & { label: Label })[];
    };
    exerciseSets: Pick<ExerciseSet, 'order' | 'reps' | 'weight' | 'duration'>[];
  };
  edit: () => void;
}

export const ScheduleItem = ({ data, edit }: ScheduleItemProps) => {
  const deleteScheduleWithId = deleteSchedule.bind(null, data.id);

  return (
    <div
      key={data.id}
      className='flex flex-col rounded-md border p-2 pb-4 pl-4 font-medium text-neutral-700'
    >
      <div className='flex items-top justify-between space-x-2'>
        <div className='flex flex-col justify-center items-start overflow-hidden'>
          <p>{data.exercise.name}</p>
          <div className='ml-1 space-x-1 overflow-scroll'>
            {data.exercise.exerciseLabels.map(({ label }) => (
                <Badge
                  key={label.id}
                  style={{
                    backgroundColor: label.color,
                    color: chroma.contrast(label.color, 'white') > chroma.contrast(label.color,'black') ? '#f1f1f1' : '#121212',
                  }}
                  className='border border-black/10 text-xs px-2'
                >
                  {label.name}
                </Badge>
            ))}
          </div>
        </div>
        <div className='flex space-x-2'>
          <Button variant={'outline'} size={'iconMd'} onClick={edit}>
            <EditIcon />
          </Button>
          <form>
            <Button
              variant={'destructive'}
              size={'iconMd'}
              formAction={deleteScheduleWithId}
            >
              <Trash />
            </Button>
          </form>
        </div>
      </div>
      {data.exerciseSets.length > 0 && (
        <ul className=''>
          {data.exerciseSets.map((set) => (
            // TODO: data.exerciseId should be data.order, to be added
            <li
              key={`${data.id}-${data.exerciseId}-${set.order}`}
              className='ml-1 text-sm text-muted-foreground'
            >
              {Number(set.weight) > 0 ? set.weight + 'kg ' : null}
              {Number(set.reps) > 0
                ? (Number(set.weight) > 0 ? 'for ' : '') + set.reps + ' reps '
                : null}
              {Number(set.duration) > 0
                ? (Number(set.reps) > 0 || Number(set.weight) > 0
                    ? 'for '
                    : '') + formatSecondsToHMS(Number(set.duration))
                : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

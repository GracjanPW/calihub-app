import { completeSet } from '@/actions/workout/edit-set';
import { Button } from '@/components/ui/button';
import { cn, formatSecondsToHMS } from '@/lib/utils';
import { ExerciseSet as Set } from '@prisma/client';
import { Check, Edit } from 'lucide-react';
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from 'react-icons/md';

export const ExerciseSet = ({
  set,
  openEdit,
}: {
  set: Set;
  openEdit: () => void;
}) => {
  const completeSetById = completeSet.bind(null, set.id);
  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-md p-1 transition-colors duration-200 ease-in-out',
        set.completed && 'bg-emerald-100'
      )}
    >
      <p className={cn('', set.completed && 'text-stone-700')}>
      {Number(set.weight) > 0 ? (
  set.completed && Number(set.completedWeight) !== Number(set.weight) ? (
    <>
      <span
        className={cn(
          'font-semibold',
          Number(set.completedWeight) > Number(set.weight)
            ? 'text-green-700'
            : 'text-red-700'
        )}
      >
        {set.completedWeight}
      </span>{' '}
      kg{' '}
    </>
  ) : (
    set.weight + ' kg '
  )
) : null}

{Number(set.reps) > 0 ? (
  set.completed && Number(set.completedReps) !== Number(set.reps) ? (
    <>
      {Number(set.weight) > 0 ? 'for ' : ''}
      <span
        className={cn(
          'font-semibold',
          Number(set.completedReps) > Number(set.reps)
            ? 'text-green-700'
            : 'text-red-700'
        )}
      >
        {set.completedReps}
      </span>{' '}
      reps{' '}
    </>
  ) : (
    (Number(set.weight) > 0 ? 'for ' : '') + set.reps + ' reps '
  )
) : null}

{Number(set.duration) > 0 ? (
  set.completed && Number(set.completedDuration) !== Number(set.duration) ? (
    <>
      <span
        className={cn(
          'font-semibold',
          Number(set.completedDuration) > Number(set.duration)
            ? 'text-green-700'
            : 'text-red-700'
        )}
      >
        {formatSecondsToHMS(set.completedDuration!)}
      </span>{' '}
      duration{' '}
    </>
  ) : (
    (Number(set.reps) > 0 || Number(set.weight) > 0 ? 'for ' : '') +
    formatSecondsToHMS(set.duration) + ' duration '
  )
) : null}
      </p>
      <div className='flex h-min items-center space-x-2'>
        <Button variant={'ghost'} size={'iconSm'} onClick={openEdit}>
          <Edit className='size-2' />
        </Button>
        <form className='m-auto flex items-center justify-center'>
          <Button
            variant={'ghost'}
            size={'iconSm'}
            formAction={completeSetById}
            className='rounded-md border border-stone-500 shadow-inner'
          >
            {set.completed && (
              <Check strokeWidth={4} className='text-emerald-700' />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

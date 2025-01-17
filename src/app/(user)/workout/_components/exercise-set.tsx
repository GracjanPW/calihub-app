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
      <p className={cn('', set.completed && 'text-emerald-700')}>
        {set.order + 1}: {Number(set.weight) > 0 ? set.weight + 'kg ' : null}
        {set.completed &&
          (Number(set.completedWeight) === Number(set.weight) ? (
            ''
          ) : (
            <span className='text-orange-400'>{set.completedWeight}Kg </span>
          ))}
        {Number(set.reps) > 0
          ? (Number(set.weight) > 0 ? 'for ' : '') + set.reps + ' reps '
          : null}
        {set.completed &&
          (Number(set.completedReps) === Number(set.reps) ? (
            ''
          ) : (
            <span className='font-semibold text-orange-400'>
              {set.completedReps} reps{' '}
            </span>
          ))}
        {Number(set.duration) > 0
          ? (Number(set.reps) > 0 || Number(set.weight) > 0 ? 'for ' : '') +
            formatSecondsToHMS(set.duration)
          : null}
        {set.completed &&
          (Number(set.duration) === Number(set.completedDuration) ? (
            ''
          ) : (
            <span className='font-semibold text-orange-400'>
              {formatSecondsToHMS(set.completedDuration!)}
            </span>
          ))}
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

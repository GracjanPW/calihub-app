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
    <div className='flex justify-between'>
      <p className={cn('leading-6 text-muted-foreground')}>
        {set.order + 1}: {Number(set.weight) > 0 ? set.weight + 'kg ' : null}
        {set.completed &&
          (Number(set.completedWeight) === Number(set.weight) ? (
            ''
          ) : (
            <span className='font-semibold text-orange-500'>
              {set.completedWeight}Kg{' '}
            </span>
          ))}
        {Number(set.reps) > 0
          ? (Number(set.weight) > 0 ? 'for ' : '') + set.reps + ' reps '
          : null}
        {set.completed &&
          (Number(set.completedReps) === Number(set.reps) ? (
            ''
          ) : (
            <span className='font-semibold text-orange-500'>
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
            <span className='font-semibold text-orange-500'>
              {formatSecondsToHMS(set.completedDuration!)}
            </span>
          ))}
      </p>
      <div className='flex space-x-2'>
        {!set.completed && (
          <Button variant={'ghost'} size={'iconSm'} onClick={openEdit}>
            <Edit className='size-2' />
          </Button>
        )}
        <form>
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

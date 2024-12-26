import { completeSet } from '@/actions/workout/edit-set';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ExerciseSet as Set } from '@prisma/client';
import { Edit, Check } from 'lucide-react';

export const ExerciseSet = ({ set }: { set: Set }) => {
  const completeSetById = completeSet.bind(null, set.id);
  return (
    <div className='flex justify-between'>
      <p className={cn('leading-6 text-muted-foreground', set.completed && "line-through")}>
        {set.order + 1}: {Number(set.weight) > 0 ? set.weight + 'kg ' : null}
        {Number(set.reps) > 0
          ? (Number(set.weight) > 0 ? 'for ' : '') + set.reps + ' reps '
          : null}
        {Number(set.duration) > 0
          ? (Number(set.reps) > 0 || Number(set.weight) > 0 ? 'for ' : '') +
            set.duration +
            's'
          : null}
      </p>
      <div className='flex space-x-2'>
        <form>
          <Button variant={'ghost'} size={'iconSm'}>
            <Edit className='size-2' />
          </Button>

          <Button
            variant={'ghost'}
            size={'iconSm'}
            formAction={completeSetById}
          >
            <Check />
          </Button>
        </form>
      </div>
    </div>
  );
};

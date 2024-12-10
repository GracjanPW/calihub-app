import { deleteExercise } from '@/actions/exercises/delete-exercise';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExerciseWithLabel } from '@/type';
import chroma from 'chroma-js';
import { Edit, Trash } from 'lucide-react';

interface ExerciseItemProps {
  data: ExerciseWithLabel;
  onClick: () => void;
}

export const ExerciseItem = ({ data, onClick }: ExerciseItemProps) => {
  const deleteExerciseWithId = deleteExercise.bind(null, data.id);
  return (
    <div className='rounded-md bg-neutral-100 p-2 pl-4'>
      <div className='flex items-center'>
        <p className='text-lg font-semibold text-neutral-600'>{data.name}</p>
        <div className='ml-auto flex'>
          <Button variant={'ghost'} size={'icon'} onClick={onClick}>
            <Edit className='' />
          </Button>
          <form>
            <Button
              variant={'ghost'}
              size={'icon'}
              formAction={deleteExerciseWithId}
            >
              <Trash />
            </Button>
          </form>
        </div>
      </div>
      <div className='w-full items-center space-x-2 space-y-2'>
        {data.exerciseLabels.map(({ label }) => (
          <Badge
            key={label.id}
            style={{
              backgroundColor: chroma(label.color).alpha(0.1).css(),
              color: chroma(label.color).css(),
            }}
          >
            {label.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

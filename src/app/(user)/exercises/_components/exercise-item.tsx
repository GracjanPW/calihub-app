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
    <div className='rounded-md border p-2 pl-4'>
      <div className='flex items-center'>
        <p className='text-lg font-semibold text-neutral-600'>{data.name}</p>
        <div className='ml-auto flex space-x-2'>
          <Button variant={'outline'} size={'iconMd'} onClick={onClick}>
            <Edit className='' />
          </Button>
          <form>
            <Button
              variant={'destructive'}
              size={'iconMd'}
              formAction={deleteExerciseWithId}
            >
              <Trash />
            </Button>
          </form>
        </div>
      </div>
      <div className='w-full items-center space-x-2 space-y-2'>
        <Badge className='border border-black/10 bg-black/10 text-black'>
          Labels
        </Badge>
        {data.exerciseLabels.map(({ label }) => (
          <Badge
            key={label.id}
            style={{
              backgroundColor: label.color,
              color:
                chroma.contrast(label.color, 'white') >
                chroma.contrast(label.color, 'black')
                  ? '#f1f1f1'
                  : '#121212',
            }}
            className='border border-black/10'
          >
            {label.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

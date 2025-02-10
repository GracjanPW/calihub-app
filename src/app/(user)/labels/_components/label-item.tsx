import { deleteLabel } from '@/actions/labels/delete-label';
import { Button } from '@/components/ui/button';
import { Label } from '@prisma/client';
import chroma from 'chroma-js';
import { Edit, Trash } from 'lucide-react';
interface LabelItemProps {
  onClick: () => void;
  data: Pick<Label, 'id' | 'name' | 'color'>;
}

export const LabelItem = ({ onClick, data }: LabelItemProps) => {
  const deleteLabelWithId = deleteLabel.bind(null, data.id);
  return (
    <div className='flex items-center rounded-md border p-2 pl-4 text-lg font-semibold text-neutral-600'>
      <div
        className='mr-2 flex size-6 justify-center rounded-md text-sm leading-7 shadow-sm shadow-neutral-600'
        style={{
          backgroundColor: data.color,
          color:
            chroma.contrast(data.color, 'white') >
            chroma.contrast(data.color, 'black')
              ? '#f1f1f1'
              : '#121212',
        }}
      >
        {data.name[0]}
      </div>
      {data.name}
      <div className='ml-auto flex space-x-2 rounded-md bg-transparent text-black/80'>
        <Button variant={'outline'} size={'iconMd'} onClick={onClick}>
          <Edit className='' />
        </Button>
        <form>
          <Button
            variant={'destructive'}
            size={'iconMd'}
            formAction={deleteLabelWithId}
          >
            <Trash className='size-6!' />
          </Button>
        </form>
      </div>
    </div>
  );
};

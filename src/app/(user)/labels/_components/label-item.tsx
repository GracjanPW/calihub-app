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
    <div
      style={{ backgroundColor: chroma(data.color).alpha(0.1).css() }}
      className='flex items-center rounded-md p-2 pl-4 text-lg font-semibold text-neutral-600'
    >
      <div
        className='mr-2 size-6 rounded-md shadow-sm shadow-neutral-600'
        style={{ backgroundColor: data.color }}
      />
      {data.name}
      <div className='ml-auto flex rounded-md bg-transparent shadow-inner shadow-neutral-300'>
        <Button variant={'ghost'} size={'icon'} onClick={onClick}>
          <Edit className='' />
        </Button>
        <form>
          <Button
            variant={'ghost'}
            size={'icon'}
            formAction={deleteLabelWithId}
          >
            <Trash />
          </Button>
        </form>
      </div>
    </div>
  );
};

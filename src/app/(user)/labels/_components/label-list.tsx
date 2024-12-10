'use client';
import { Label } from '@prisma/client';
import { LabelItem } from './label-item';
import { useState } from 'react';
import { EditLabelDrawer } from './edit-label-drawer';

interface LabelListProps {
  data: Pick<Label, 'id' | 'name' | 'color'>[];
}

export const LabelList = ({ data }: LabelListProps) => {
  const [open, setOpen] = useState(false);
  const [openedLabel, setOpenedLabel] = useState<Label>();

  const openLabelEdit = (id: string) => {
    const label = data.find((label) => label.id === id);
    setOpenedLabel(label as Label);
    setOpen(true);
  };

  const closeLabelEdit = () => {
    setOpen(false);
    setOpenedLabel(undefined);
  };

  return (
    <>
      <div className='flex-1 overflow-y-auto'>
        <div className='h-0 space-y-4'>
          {data.map((label) => (
            <LabelItem
              key={label.id}
              data={label}
              onClick={() => openLabelEdit(label.id)}
            />
          ))}
        </div>
      </div>
      <EditLabelDrawer
        open={open}
        setClose={closeLabelEdit}
        data={openedLabel}
      />
    </>
  );
};

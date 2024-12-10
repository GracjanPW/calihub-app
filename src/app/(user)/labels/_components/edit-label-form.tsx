'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { editLabelSchema } from '@/schema/label.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { HexColorPicker } from 'react-colorful';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { Label } from '@prisma/client';
import { editLabel } from '@/actions/labels/edit-label';

interface EditLabelFormProps {
  defaultValues: Label;
  onSuccess: () => void;
}

export const EditLabelForm = ({
  onSuccess,
  defaultValues,
}: EditLabelFormProps) => {
  const [pending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof editLabelSchema>>({
    resolver: zodResolver(editLabelSchema),
    defaultValues,
  });

  const handleSubmit = (values: z.infer<typeof editLabelSchema>) => {
    startTransition(() => {
      editLabel(values)
        .then(() => {
          onSuccess();
        })
        .catch(() => {
          console.log('Something went wrong');
        });
    });
  };

  const state = useWatch({
    control: form.control,
  });
  const hasChanges = !(
    state.name === defaultValues.name && state.color === defaultValues.color
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <div className='relative'>
                <FormControl>
                  <Input {...field} disabled={pending} />
                </FormControl>
                <div
                  className='absolute right-2 top-1/2 aspect-square size-6 -translate-y-1/2 rounded-md'
                  style={{ backgroundColor: state.color }}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='color'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label color</FormLabel>
              <FormControl>
                <HexColorPicker
                  color={field.value}
                  {...field}
                  className='!aspect-square !h-auto !w-full'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={pending || !hasChanges} className='w-full'>
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

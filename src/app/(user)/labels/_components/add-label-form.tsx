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
import { addLabelSchema } from '@/schema/label.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { HexColorPicker } from 'react-colorful';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { addLabel } from '@/actions/labels/add-label';

export const AddLabelForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [pending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof addLabelSchema>>({
    resolver: zodResolver(addLabelSchema),
    defaultValues: {
      name: '',
      color: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof addLabelSchema>) => {
    startTransition(() => {
      addLabel(values)
        .then(() => {
          onSuccess?.();
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  const previewColor = useWatch({
    control: form.control,
  });

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
                  style={{ backgroundColor: previewColor.color }}
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
        <Button disabled={pending} className='w-full'>
          Create label
        </Button>
      </form>
    </Form>
  );
};

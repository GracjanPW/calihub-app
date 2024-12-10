'use client';
import { addExercise } from '@/actions/exercises/add-exercise';
import { LabelSelector } from '@/components/form/label-select';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useGetLabels } from '@/hooks/use-get-labels';
import { addExerciseSchema } from '@/schema/exercise.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const AddExerciseForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [pending, startTransition] = useTransition();
  const { data: labels, status } = useGetLabels();
  const form = useForm<z.infer<typeof addExerciseSchema>>({
    resolver: zodResolver(addExerciseSchema),
    defaultValues: {
      name: '',
      labels: [],
    },
  });

  const handleSubmit = (values: z.infer<typeof addExerciseSchema>) => {
    startTransition(() => {
      addExercise(values)
        .then(() => {
          onSuccess();
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={pending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='labels'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Labels</FormLabel>
              <FormControl>
                <LabelSelector
                  ref={field.ref}
                  name={field.name}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  disabled={pending}
                  options={labels.map((label) => ({
                    value: label.id,
                    label: label.name,
                    color: label.color,
                  }))}
                  loaded={status === 'success'}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className='w-full' disabled={pending}>
          Create
        </Button>
      </form>
    </Form>
  );
};

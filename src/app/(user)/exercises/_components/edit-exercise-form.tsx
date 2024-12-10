'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { editExerciseSchema } from '@/schema/exercise.schema';
import { ExerciseWithLabel } from '@/type';
import { useGetLabels } from '@/hooks/use-get-labels';
import { LabelSelector } from '@/components/form/label-select';
import { editExercise } from '@/actions/exercises/edit-exercise';

interface EditExerciseFormProps {
  defaultValues: ExerciseWithLabel;
  onSuccess: () => void;
}

type SelectOptions = {
  value: string;
  label: string;
  color: string;
};

function arrayEquals(arr1: SelectOptions[], arr2: SelectOptions[]) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i].value !== arr2[i].value) return false;
  }
  return true;
}

export const EditExerciseForm = ({
  onSuccess,
  defaultValues,
}: EditExerciseFormProps) => {
  const { data: labels, status } = useGetLabels();
  const [pending, startTransition] = useTransition();
  const defaultLabels = defaultValues.exerciseLabels.map(({ label }) => ({
    value: label.id,
    label: label.name,
    color: label.color,
  }));
  const form = useForm<z.infer<typeof editExerciseSchema>>({
    resolver: zodResolver(editExerciseSchema),
    defaultValues: {
      ...defaultValues,
      labels: defaultLabels || [],
    },
  });

  const handleSubmit = (values: z.infer<typeof editExerciseSchema>) => {
    startTransition(() => {
      editExercise(values)
        .then(() => {
          onSuccess();
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  const state = useWatch({
    control: form.control,
  });
  const hasChanges = !arrayEquals(
    defaultLabels,
    state.labels as SelectOptions[]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <div className='space-y-2'>
          <label htmlFor='name' className='text-sm font-semibold'>
            Name
          </label>
          <div
            id='name'
            className='w-full rounded-md border border-neutral-300 p-2 pl-3'
          >
            {defaultValues.name}
          </div>
        </div>
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
                  defaultValue={field.value}
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

        <Button className='w-full' disabled={pending || !hasChanges}>
          Save changes
        </Button>
      </form>
    </Form>
  );
};

'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { type ChangeEvent, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { addExerciseSetSchema } from '@/schema/exercise-set.schema';
import { z } from 'zod';

import { Input } from '@/components/ui/input';
import { addSet } from '@/actions/workout/add-set';
import { Check } from 'lucide-react';

interface AddSetFormProps {
  scheduleId: string;
  onSuccess?: () => void;
}

export const AddSetForm = ({ scheduleId, onSuccess }: AddSetFormProps) => {
  const [pending, startTransition] = useTransition();
  const [completed, setCompeted] = useState(false);
  const form = useForm<z.infer<typeof addExerciseSetSchema>>({
    resolver: zodResolver(addExerciseSetSchema),
    defaultValues: {
      scheduleId,
      duration: '00:00:00',
      reps: '0',
      weight: '0',
      completed: false,
    },
  });

  const handleNumberInput = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (num: string) => void
  ) => {
    const value = e.currentTarget.value;
    if (value.length === 0) {
      return onChange('0');
    } else if (!/^\d*$/.test(value)) {
      return;
    }
    const number = Number(value);
    onChange(number.toString());
  };

  const handleWeightInput = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (num: string) => void
  ) => {
    const value = e.currentTarget.value;
    if (value.length === 0) {
      return onChange('0');
    } else if (!/^[0-9]*\.?[0-9]{0,3}$/.test(value)) {
      return;
    }
    const number = Number(value);
    onChange(number.toString() + (value[value.length - 1] === '.' ? '.' : ''));
  };

  const handleTimeInput = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (num: string) => void
  ) => {
    const value = e.currentTarget.value;
    let [hh, mm, ss]: string[] = value.split(':');
    if (isNaN(Number(ss))) return;
    let temp = '';
    if (ss?.length > 2) {
      if (hh.charAt(0) !== '0') return;
      temp = ss.charAt(0);
      ss = ss.slice(1);
      mm += temp;
    } else if (ss?.length < 2) {
      temp = mm.charAt(1);
      mm = mm.slice(0, -1);
      ss = temp + ss;
    }
    if (mm.length > 2) {
      if (hh.charAt(0) !== '0') return;
      temp = mm.charAt(0);
      mm = mm.slice(1);
      hh += temp;
    } else if (mm.length < 2) {
      temp = hh.charAt(1);
      hh = hh.slice(0, -1);
      mm = temp + mm;
    }
    if (hh.length > 2) {
      if (hh.charAt(0) !== '0') return;
      temp = hh.charAt(0);
      hh = hh.slice(1);
    } else if (hh.length < 2) {
      temp = '0';
      hh = temp + hh;
    }

    onChange(`${hh}:${mm}:${ss}`);
  };

  const handleSubmit = (values: z.infer<typeof addExerciseSetSchema>) => {
    startTransition(() => {
      addSet(values)
        .then(() => {
          onSuccess?.();
        })
        .catch((e) => console.log(e));
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='weight'
          render={({ field }) => (
            <FormItem className='flex space-x-2'>
              <FormLabel className='flex items-center justify-center'>
                W(kg)
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => handleWeightInput(e, field.onChange)}
                  disabled={pending}
                  className='text-sm'
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='reps'
          render={({ field }) => (
            <FormItem className='flex space-x-2'>
              <FormLabel className='flex items-center justify-center'>
                Reps
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => handleNumberInput(e, field.onChange)}
                  onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                  disabled={pending}
                  className='text-sm'
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='duration'
          render={({ field }) => (
            <FormItem className='flex space-x-2'>
              <FormLabel className='flex items-center justify-center'>
                T(hh:mm:ss)
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => handleTimeInput(e, field.onChange)}
                  onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                  min={0}
                  disabled={pending}
                  className='text-sm'
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className='flex items-center space-x-2'>
          <p>Complete?</p>
          <Button
            type='button'
            variant={'ghost'}
            size={'iconSm'}
            onClick={() => {
              form.setValue('completed', !completed);
              setCompeted((prev) => !prev);
            }}
            className='rounded-md border border-stone-500 shadow-inner'
          >
            {completed && (
              <Check strokeWidth={4} className='text-emerald-700' />
            )}
          </Button>
        </div>
        <Button className='w-full' disabled={pending}>
          Add set
        </Button>
      </form>
    </Form>
  );
};

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
import React, { type ChangeEvent, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { updateExerciseSetSchema } from '@/schema/exercise-set.schema';
import { z } from 'zod';

import { formatSecondsToHHMMSS, formatSecondsToHMS } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { ExerciseSet } from '@prisma/client';
import { editSet } from '@/actions/workout/edit-set';

interface AddScheduleFormProps {
  data: ExerciseSet;
  onSuccess?: () => void;
}

export const EditSetForm = ({ data, onSuccess }: AddScheduleFormProps) => {
  console.log(data);
  const [pending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof updateExerciseSetSchema>>({
    resolver: zodResolver(updateExerciseSetSchema),
    defaultValues: {
      id: data?.id,
      completedDuration: data.duration
        ? formatSecondsToHHMMSS(data.duration)
        : '00:00:00',
      completedWeight: data?.weight ? data.weight.toString() : '0',
      completedReps: data?.reps ? data.reps.toString() : '0',
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

  const handleSubmit = (values: z.infer<typeof updateExerciseSetSchema>) => {
    console.log(values);
    startTransition(() => {
      editSet(values)
        .then(() => {
          onSuccess?.();
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <div className='grid w-full grid-cols-1 grid-rows-[40px_repeat(3,_minmax(0,_1fr))] gap-y-2'>
          <div className='grid grid-cols-3 text-center'>
            <div>Set</div>
            <div>Target</div>
            <div>Actual</div>
          </div>
          <FormField
            control={form.control}
            name='completedWeight'
            render={({ field }) => (
              <FormItem className='grid grid-cols-3'>
                <FormLabel className='flex items-center justify-center'>
                  W(kg)
                </FormLabel>
                <div className='flex items-center justify-center'>
                  {data.weight}
                </div>
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
            name='completedReps'
            render={({ field }) => (
              <FormItem className='grid grid-cols-3'>
                <FormLabel className='flex items-center justify-center'>
                  Reps
                </FormLabel>
                <div className='flex items-center justify-center'>
                  {data.reps}
                </div>
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
            name='completedDuration'
            render={({ field }) => (
              <FormItem className='grid grid-cols-3'>
                <FormLabel className='flex items-center justify-center'>
                  T(hh:mm:ss)
                </FormLabel>
                <div className='flex items-center justify-center'>
                  {formatSecondsToHMS(data.duration)}
                </div>
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
        </div>
        <Button className='w-full' disabled={pending}>
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

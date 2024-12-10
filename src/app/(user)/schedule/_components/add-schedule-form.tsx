'use client';
import { addSchedule } from '@/actions/schedule/add-schedule';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetExercises } from '@/hooks/use-get-exercies';
import React, { type ChangeEvent, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { AddScheduleSchema } from '@/schema/schedule.schema';
import { z } from 'zod';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon, TrashIcon, Weight } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';

interface AddScheduleFormProps {
  defaultValues?: {
    date?: Date;
  };
  onSuccess?: () => void;
}

export const AddScheduleForm = ({
  defaultValues,
  onSuccess,
}: AddScheduleFormProps) => {
  const [pending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof AddScheduleSchema>>({
    resolver: zodResolver(AddScheduleSchema),
    defaultValues: {
      exerciseId: '',
      date: defaultValues?.date,
      sets: [],
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: 'sets',
  });

  const { data, status } = useGetExercises();

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
    let temp = '';
    if (ss.length > 2) {
      if (hh.charAt(0) !== '0') return;
      temp = ss.charAt(0);
      ss = ss.slice(1);
      mm += temp;
    } else if (ss.length < 2) {
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

  const handleSubmit = (values: z.infer<typeof AddScheduleSchema>) => {
    console.log(values);
    startTransition(() => {
      addSchedule(values)
        .then(() => {
          console.log('success');
          onSuccess?.();
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };
  // TODO: display validation error messages
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='exerciseId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exercise</FormLabel>
              <Select
                disabled={pending}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Exercise' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {status === 'loading' && <p>Loading</p>}
                  {data.map((exercise) => (
                    <SelectItem key={exercise.id} value={exercise.id!}>
                      {exercise.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='date'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <Popover>
                  <FormControl>
                    <PopoverTrigger asChild>
                      <Button
                        type='button'
                        disabled={pending}
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon />
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                  </FormControl>
                  <PopoverContent className='w-auto p-0'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            );
          }}
        />
        {/* TODO: add order swap for sets */}
        <ul className='space-y-4'>
          {fieldArray.fields.map((field, idx) => (
            <li
              key={field.id}
              className='flex items-end justify-start space-x-2'
            >
              <FormField
                control={form.control}
                name={`sets.${idx}.sets`}
                render={({ field }) => (
                  <FormItem className='!max-w-[40px]'>
                    {idx === 0 && <FormLabel>Sets</FormLabel>}
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => handleNumberInput(e, field.onChange)}
                        onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                        className='text-sm'
                        disabled={pending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`sets.${idx}.weight`}
                render={({ field }) => (
                  <FormItem>
                    {idx === 0 && <FormLabel>W(kg)</FormLabel>}
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
                name={`sets.${idx}.reps`}
                render={({ field }) => (
                  <FormItem className='!max-w-[50px]'>
                    {idx === 0 && <FormLabel>Reps</FormLabel>}
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
                name={`sets.${idx}.duration`}
                render={({ field }) => (
                  <FormItem className='!min-w-[90px]'>
                    {idx === 0 && <FormLabel>T(hh:mm:ss)</FormLabel>}
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
              <Button
                variant={'outline'}
                className='aspect-square w-auto'
                size={'icon'}
                disabled={pending}
                type='button'
                onClick={() => fieldArray.remove(idx)}
              >
                <TrashIcon />
              </Button>
            </li>
          ))}
        </ul>
        <Button
          disabled={pending}
          type='button'
          onClick={() =>
            fieldArray.append({
              sets: '1',
              weight: '0',
              reps: '0',
              duration: '00:00:00',
            })
          }
        >
          Add set
        </Button>
        <Button className='w-full' disabled={pending}>
          Add workout
        </Button>
      </form>
    </Form>
  );
};

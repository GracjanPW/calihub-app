'use client';
import { addSchedule } from '@/actions/schedule/add-schedule';
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
import { copyScheduleSchema } from '@/schema/schedule.schema';
import { z } from 'zod';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { copySchedule } from '@/actions/schedule/copy-schedule';

interface CopyScheduleFormProps {
  defaultValues?: {
    date?: Date;
    scheduleIds: string[];
  };
  onSuccess?: () => void;
}

export const CopyScheduleForm = ({
  defaultValues,
  onSuccess,
}: CopyScheduleFormProps) => {
  const [pending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof copyScheduleSchema>>({
    resolver: zodResolver(copyScheduleSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: z.infer<typeof copyScheduleSchema>) => {
    console.log(values);
    startTransition(() => {
      copySchedule(values)
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
                      disabled={{ before: new Date() }}
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            );
          }}
        />
        <Button className='w-full' disabled={pending}>
          Copy workout
        </Button>
      </form>
    </Form>
  );
};

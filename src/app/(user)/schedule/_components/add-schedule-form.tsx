"use client";
import { addSchedule } from "@/actions/schedule/add-schedule";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetExercises } from "@/hooks/use-get-exercies";
import React, { type ChangeEvent, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { AddScheduleSchema } from "@/schema/schedule.schema";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, TrashIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";

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
      exerciseId: "",
      date: defaultValues?.date,
      sets: [],
    },
  });
  const fieldArray = useFieldArray({
    control: form.control,
    name: "sets",
  });

  const { data, status } = useGetExercises();

  const handleNumberInput = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (num: string) => void
  ) => {
    const value = e.currentTarget.value;
    if (value.length === 0) {
      return onChange("0");
    }
    const number = Number(value);
    onChange(number.toString());
  };

  const handleSubmit = (values: z.infer<typeof AddScheduleSchema>) => {
    console.log(values);
    startTransition(() => {
      addSchedule(values)
        .then(() => {
          console.log("succes");
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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          disabled={pending}
          control={form.control}
          name="exerciseId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exercise</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Exercise" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {status === "loading" && <p>Loading</p>}
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
          disabled={pending}
          name="date"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
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
        <ul className="space-y-4">
          {fieldArray.fields.map((field, idx) => (
            <li key={field.id} className="flex space-x-8 items-end">
              <FormField
                disabled={pending}
                control={form.control}
                name={`sets.${idx}.sets`}
                render={({ field }) => (
                  <FormItem>
                    {idx === 0 && <FormLabel>Sets</FormLabel>}
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => handleNumberInput(e, field.onChange)}
                        onKeyDown={(e) => e.key === "." && e.preventDefault()}
                        type="number"
                        min={1}
                        step={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* TODO: add further validation e.g max 2 decimal points, step of 0.01 */}
              <FormField
                disabled={pending}
                control={form.control}
                name={`sets.${idx}.weight`}
                render={({ field }) => (
                  <FormItem>
                    {idx === 0 && <FormLabel>Weight</FormLabel>}
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => handleNumberInput(e, field.onChange)}
                        type="number"
                        min={0}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                disabled={pending}
                control={form.control}
                name={`sets.${idx}.reps`}
                render={({ field }) => (
                  <FormItem>
                    {idx === 0 && <FormLabel>Reps</FormLabel>}
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => handleNumberInput(e, field.onChange)}
                        type="number"
                        onKeyDown={(e) => e.key === "." && e.preventDefault()}
                        min={0}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* TODO: implement a proper time input so user can enter hours minutes or seconds. currently only input in seconds */}
              <FormField
                control={form.control}
                name={`sets.${idx}.duration`}
                render={({ field }) => (
                  <FormItem>
                    {idx === 0 && <FormLabel>Duration</FormLabel>}
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => handleNumberInput(e, field.onChange)}
                        type="number"
                        onKeyDown={(e) => e.key === "." && e.preventDefault()}
                        min={0}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                variant={"ghost"}
                size={"icon"}
                disabled={pending}
                type="button"
                onClick={() => fieldArray.remove(idx)}
              >
                <TrashIcon />
              </Button>
            </li>
          ))}
        </ul>
        <Button
          disabled={pending}
          type="button"
          onClick={() =>
            fieldArray.append({
              sets: "1",
              weight: "0",
              reps: "0",
              duration: "0",
            })
          }
        >
          Add set
        </Button>
        <Button className="w-full" disabled={pending}>
          Add workout
        </Button>
      </form>
    </Form>
  );
};

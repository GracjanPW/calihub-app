"use client";
import { addSchedule } from "@/actions/schedule/add-schedule";
import { DatePicker } from "@/components/form/date-picker";
import { FormError } from "@/components/form/form-error";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetExercises } from "@/hooks/use-get-exercies";
import { startTransition, useActionState, useEffect, useState } from "react";

export const AddScheduleForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [state, action, pending] = useActionState(addSchedule, {
    error: null,
    success: false,
  });
  const { data, status } = useGetExercises();
  const [date, setDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("date", date ? date.toDateString() : "");
    startTransition(async () => {
      action(formData);
    });
  };

  useEffect(() => {
    if (state.success) {
      onSuccess?.();
    }
  }, [state.success]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select name="exerciseId">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Exercise" />
        </SelectTrigger>
        <SelectContent>
          {status === "loading" && <p>Loading</p>}
          {data.map((exercise) => (
            <SelectItem key={exercise.id} value={exercise.id!}>
              {exercise.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <DatePicker date={date} setDate={setDate} />
      {state.error && <FormError message={state.error} />}
      {state.success && <FormError message="Created!" />}
      <Button className="w-full">Add</Button>
    </form>
  );
};
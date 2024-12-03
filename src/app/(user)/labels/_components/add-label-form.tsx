"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addLabelSchema } from "@/schema/label.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { HexColorPicker } from "react-colorful";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { addLabel } from "@/actions/labels/add-label";

export const AddLabelForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [pending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof addLabelSchema>>({
    resolver: zodResolver(addLabelSchema),
    defaultValues: {
      name: "",
      color: "",
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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          disabled={pending}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input {...field} />
                  <div
                    className="absolute size-6 rounded-md aspect-square right-2 top-1/2 -translate-y-1/2"
                    style={{ backgroundColor: previewColor.color }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={pending}
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label color</FormLabel>
              <FormControl>
                <HexColorPicker
                  color={field.value}
                  {...field}
                  className="!w-full !h-auto !aspect-square"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={pending} className="w-full">
          Create label
        </Button>
      </form>
    </Form>
  );
};

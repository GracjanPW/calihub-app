"use client";

import register from "@/actions/auth/register";
import { FormError } from "@/components/form/form-error";
import { FormSuccess } from "@/components/form/form-success";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";

export const SignUpForm = () => {
  const [state, formAction, pending] = useActionState(register, {
    error: null,
    success: null,
  });
  return (
    <form className="space-y-4" action={formAction}>
      <Input
        id="name"
        name="name"
        placeholder="Name"
        type="text"
        disabled={pending}
        required
      />
      <Input
        id="email"
        name="email"
        placeholder="Email"
        type="email"
        disabled={pending}
        required
      />
      <Input
        id="password"
        name="password"
        placeholder="Password"
        type="password"
        disabled={pending}
        required
      />
      {state?.error && <FormError message={state?.error} />}
      {state?.success && <FormSuccess message={state?.success} />}
      <Button className="w-full" disabled={pending}>
        Register
      </Button>
    </form>
  );
};

"use client";

import login from "@/actions/auth/login";
import { FormError } from "@/components/form/form-error";
import { FormSuccess } from "@/components/form/form-success";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";

export const SignInForm = () => {
  const [state, action, pending] = useActionState(login, {error:null, success:null});
  return (
    <form className="space-y-4" action={action}>
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
      {state?.error && <FormError message={state.error}/>}
      {state?.success && <FormSuccess message={state.success}/>}
      <Button disabled={pending} className="w-full">
        Login
      </Button>
    </form>
  );
};

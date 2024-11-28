"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const SignInForm = () => {
  return (
    <form className="space-y-4">
      <Input placeholder="Email" type="email" required />
      <Input placeholder="Password" type="password" required />
      <Button className="w-full">Login</Button>
    </form>
  );
};

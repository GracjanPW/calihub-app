"use client";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

export const AuthProviders = () => {
  return (
    <div className="flex space-x-4 justify-between">
      <Button
        onClick={() => signIn("google")}
        className="w-full"
        variant={"outline"}
      >
        <FaGoogle />
      </Button>
      <Button
        onClick={() =>
          signIn("github", {
            redirectTo: "/",
          })
        }
        className="w-full"
        variant={"outline"}
      >
        <FaGithub />
      </Button>
    </div>
  );
};
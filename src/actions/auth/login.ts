"use server";

import { DEFAULT_AUTH_REDIRECT } from "@/routes";
import { signIn } from "@/lib/auth";
import { getUserByEmail } from "@/lib/db/user";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";

type State = {
  error?: string | null;
  success?: string | null;
};

export default async function login(
  prevState: State,
  formData: FormData
): Promise<State> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password)
    return {
      error: "Missing required fields",
    };

  const existingUser = await getUserByEmail(email);

  if (!existingUser)
    return {
      error: "Invalid credentials",
    };

  // TODO: check if email verified, if not send a new verification link

  // TODO: check two factor

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_AUTH_REDIRECT,
    });
    return {
      success: "Authenticated!",
    };
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    if (isRedirectError(e)) throw e;
    return {
      error: "Something went wrong",
    };
  }
}

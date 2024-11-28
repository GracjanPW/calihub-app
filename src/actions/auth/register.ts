"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

type State = {
  error?: string|null;
  success?: string|null;
}

export default async function register(
  prevState: State,
  formData: FormData
):Promise<State> {
  // TODO: form validation
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email! || !password)
    return {
      error: "Missing required fields",
    };

  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
      },
    });

    if (existingUser)
      return {
        error: "This email has already been taken, try another",
      };

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    // TODO: create verification token

    if (!newUser)
      return {
        error: "Failed to create user, try again",
      };

    return {
      success: "User created! Verify email",
    };
  } catch {
    return {
      error: "Something went wrong",
    };
  }
}

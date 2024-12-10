'use server';

import { db } from '@/lib/db';
import {
  getPasswordResetTokenByEmail,
  getPasswordResetTokenByToken,
} from '@/lib/db/password-reset-token';
import { getUserByEmail } from '@/lib/db/user';
import { resetEmail } from '@/lib/email/send-email';
import { hashSync } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

type State = {
  error?: string | null;
  success?: string | null;
};

export async function sendResetEmail(
  prevState: State,
  formData: FormData
): Promise<State> {
  const email = formData.get('email') as string;

  if (!email)
    return {
      error: 'Email is required',
    };

  const existingUser = await getUserByEmail(email);

  if (!existingUser)
    return {
      error: 'No account with this email exists',
    };

  if (!existingUser?.password)
    return {
      error: 'This account is linked to an OAuth provider',
    };

  const existingResetToken = await getPasswordResetTokenByEmail(email);
  if (existingResetToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingResetToken.id,
      },
    });
  }

  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
  const token = uuidv4();

  const newResetToken = await db.passwordResetToken.create({
    data: {
      email,
      expiresAt,
      token,
    },
  });

  if (!newResetToken)
    return {
      error: 'Something went wrong, please try again',
    };

  resetEmail(newResetToken.email, newResetToken.token);

  return {
    success: 'Reset password link sent!',
  };
}

export async function setNewPassowrd(
  prevState: State,
  formData: FormData
): Promise<State> {
  const token = formData.get('token') as string;
  const password = formData.get('password') as string;

  if (!token || !password)
    return {
      error: 'Token or new password missing',
    };

  const resetToken = await getPasswordResetTokenByToken(token);
  if (!resetToken)
    return {
      error: 'token not found',
    };
  const expired = resetToken.expiresAt.getTime() < new Date().getTime();
  if (expired)
    return {
      error: 'token expired',
    };

  const user = await getUserByEmail(resetToken.email);
  if (!user)
    return {
      error: 'the user no longer exists',
    };

  try {
    const hashedPassword = hashSync(password, 10);
    const updated = await db.user.update({
      where: {
        email: resetToken.email,
      },
      data: {
        password: hashedPassword,
      },
    });
    if (!updated) throw '';
    await db.passwordResetToken.delete({ where: { id: resetToken.id } });
  } catch {
    return {
      error: 'Something went wrong',
    };
  } finally {
    return { success: 'Password updated!' };
  }
}

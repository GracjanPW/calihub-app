import { PasswordResetToken } from '@prisma/client';
import { db } from '../db';

/**
 * @function getPasswordResetTokenByEmail
 *
 * @param email - String
 *
 */
export async function getPasswordResetTokenByEmail(
  email: string
): Promise<PasswordResetToken | null> {
  try {
    const token = await db.passwordResetToken.findFirst({
      where: {
        email,
      },
    });
    return token;
  } catch {
    return null;
  }
}

/**
 * @function getPasswordResetTokenByToken
 *
 * @param token - string
 */
export async function getPasswordResetTokenByToken(
  token: string
): Promise<PasswordResetToken | null> {
  try {
    const resetToken = await db.passwordResetToken.findFirst({
      where: {
        token,
      },
    });
    return resetToken;
  } catch {
    return null;
  }
}

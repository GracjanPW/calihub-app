import { AuthCard } from '../../_components/auth-card';
import { FormError } from '@/components/form/form-error';
import { NewPasswordForm } from '../../_components/new-password-form';
import { getPasswordResetTokenByToken } from '@/lib/db/password-reset-token';

const NewPasswordPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ token: string | undefined }>;
}) => {
  const token = (await searchParams).token;
  const exists = await getPasswordResetTokenByToken(token!);
  if (!exists) {
    return (
      <AuthCard
        title='Create new password'
        footerText='Back to login'
        footerUrl='/auth/sign-in'
      >
        <FormError message='This link is invalid' />
      </AuthCard>
    );
  }
  const expired = exists.expiresAt.getTime() < new Date().getTime();
  if (expired) {
    return (
      <AuthCard
        title='Create new password'
        footerText='Back to login'
        footerUrl='/auth/sign-in'
      >
        <FormError message='This link has expired' />
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title='Create new password'
      footerText='Back to login'
      footerUrl='/auth/sign-in'
    >
      <NewPasswordForm token={exists.token} />
    </AuthCard>
  );
};

export default NewPasswordPage;

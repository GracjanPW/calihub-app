'use client';

import { setNewPassowrd } from '@/actions/auth/password-reset';
import { FormError } from '@/components/form/form-error';
import { FormSuccess } from '@/components/form/form-success';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useActionState } from 'react';

export const NewPasswordForm = ({ token }: { token: string }) => {
  const [state, action, pending] = useActionState(setNewPassowrd, {
    error: null,
    success: null,
  });

  return (
    <form action={action} className='space-y-4'>
      <input id='token' name='token' type='hidden' hidden value={token} />
      <Input
        id='password'
        name='password'
        type='password'
        placeholder='Password'
        disabled={pending}
      />
      {state?.error && <FormError message={state.error} />}
      {state?.success && <FormSuccess message={state.success} />}
      <Button className='w-full' disabled={pending}>
        Confirm new password
      </Button>
    </form>
  );
};

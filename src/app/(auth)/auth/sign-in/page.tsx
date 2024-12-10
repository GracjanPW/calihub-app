import { Separator } from '@/components/ui/separator';
import { AuthCard } from '../../_components/auth-card';
import { AuthProviders } from '../../_components/auth-providers';
import { SignInForm } from '../../_components/sign-in-form';

const SignInPage = () => {
  return (
    <AuthCard
      title='Sign In'
      footerText="Don't have an account?"
      footerUrl='/auth/sign-up'
    >
      <SignInForm />
      <Separator />
      <AuthProviders />
    </AuthCard>
  );
};

export default SignInPage;

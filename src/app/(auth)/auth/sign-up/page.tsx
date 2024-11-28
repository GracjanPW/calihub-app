import { Separator } from "@/components/ui/separator";
import { AuthCard } from "../../_components/auth-card";
import { AuthProviders } from "../../_components/auth-providers";
import { SignUpForm } from "../../_components/sign-up-form";

const SignUpPage = () => {
  return (
    <AuthCard
      title="Sign Up"
      footerText="Have an account already?"
      footerUrl="/auth/sign-in"
    >
      <SignUpForm />
      <Separator />
      <AuthProviders />
    </AuthCard>
  );
};

export default SignUpPage;

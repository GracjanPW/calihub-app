import { AuthCard } from "../../_components/auth-card";
import { ResetPasswordForm } from "../../_components/reset-password-form";

const PasswordRestPage = () => {
  return ( <AuthCard
    title="Reset password"
    footerText="Back to login"
    footerUrl="/auth/sign-in"
  >
    <ResetPasswordForm/>
  </AuthCard> );
}
 
export default PasswordRestPage;
"use client"
import { sendResetEmail } from "@/actions/auth/password-reset"
import { FormError } from "@/components/form/form-error"
import { FormSuccess } from "@/components/form/form-success"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useActionState } from "react"

export const ResetPasswordForm = () => {
  const [state, action, pending] = useActionState(sendResetEmail,{error:null,success:null})
  return (
    <form action={action} className="space-y-4">
      <Input id="email" name="email" placeholder="Email" disabled={pending}/>
      {state?.error && <FormError message={state.error}/>}
      {state?.success && <FormSuccess message={state.success}/>}
      <Button className="w-full" disabled={pending}>
        Send reset link
      </Button>
    </form>
  )
}
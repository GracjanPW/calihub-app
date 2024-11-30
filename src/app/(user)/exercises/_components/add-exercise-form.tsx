"use client"
import { createExercise } from "@/actions/exercises/create-exercise"
import { FormError } from "@/components/form/form-error"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useActionState, useEffect } from "react"

export const AddExerciseForm = ({onSuccess}:{onSuccess:()=>void}) => {
  const [state,action,pending] = useActionState(createExercise,{error:null, success:false})

  useEffect(()=>{
    if (state.success) {
      onSuccess()
    }
  },[state,onSuccess])

  return (
    <form action={action} className="space-y-4">
      <Input id="name" name="name" placeholder="Name"/>
      {state?.error && <FormError message={state.error}/>}
      <Button className="w-full" disabled={pending}>
        Create
      </Button>
    </form>
  )
}
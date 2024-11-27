"use client"
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";


const SignInPage = () => {
  return ( 
    <div>
      <Button onClick={()=>signIn('github')}>
        Login github  
      </Button>      
    </div>
   );
}
 
export default SignInPage;
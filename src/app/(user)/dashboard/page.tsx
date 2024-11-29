"use client"

import { signOut } from "next-auth/react";

const DashboardPage = () => {
  return ( 
    <div>
      hello
      <button onClick={()=>signOut()}>
        logout
      </button>
    </div>
   );
}
 
export default DashboardPage;
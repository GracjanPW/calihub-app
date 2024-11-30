import { auth } from "@/lib/auth";
import { DEFAULT_AUTH_PAGE } from "@/routes";
import { redirect } from "next/navigation";
import { UserBar } from "./_components/user-bar";
import { User } from "@prisma/client";

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
  const data = await auth();
  if (!data?.user) {
    return redirect(DEFAULT_AUTH_PAGE);
  }
  return (
    <div className="relative h-full flex flex-col">
      <UserBar user={data.user as User} />
      {children}
    </div>
  );
};

export default UserLayout;

import { UserButton } from "@/components/user-button";
import { User } from "@prisma/client";
import { UserNav } from "./user-nav";

export const UserBar = ({ user }: { user: User }) => {
  return (
    <div className="h-[120px] bg-neutral-800">
      <div className="flex justify-between items-center p-4">
        <UserNav />
        <UserButton data={user} />
      </div>
    </div>
  );
};

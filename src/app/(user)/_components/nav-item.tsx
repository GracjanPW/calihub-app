import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { IconType } from "react-icons/lib";

interface NavItemProps {
  label: string;
  href: string;
  active: boolean;
  Icon: IconType | LucideIcon;
}

export const NavItem = ({ label, href, active, Icon }: NavItemProps) => {
  return (
    <Button
      variant={"ghost"}
      className={cn(
        "w-full justify-start items-center text-xl",
        active && "bg-accent"
      )}
      asChild
    >
      <Link href={href}>
        <Icon className="!size-6" />
        {label}
      </Link>
    </Button>
  );
};

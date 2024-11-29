"use client";
import { Button } from "@/components/ui/button";
import { Boxes, LucideWeight, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { NavItem } from "./nav-item";

const nav_items = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Boxes,
  },
  {
    label: "Exercises",
    href: "/exercises",
    icon: LucideWeight,
  },
];

export const UserNav = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghostDark"} size={"icon"}>
          <Menu className="text-neutral-300 !size-8" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle className="text-2xl">Menu</SheetTitle>
        </SheetHeader>
        <Separator className="my-2" />
        <div className="space-y-2">
          {nav_items.map((item) => (
            <NavItem
              key={item.label}
              label={item.label}
              href={item.href}
              active={item.href === pathname}
              Icon={item.icon}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

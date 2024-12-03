"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddLabelForm } from "./add-label-form";

export const AddLabelDrawer = () => {
  const [open, setOpen] = useState(false);
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="w-full font-semibold" variant={"outline"}>
          <Plus />
          Add new
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add label</DrawerTitle>
          <DrawerDescription>
            Create new label here, these can be used to categorize your
            exercises
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 mb-2">
          <AddLabelForm onSuccess={() => setOpen(false)} />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

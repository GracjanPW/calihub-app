"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ExerciseWithLabel } from "@/type";
import { EditExerciseForm } from "./edit-exercise-form";

interface EditExerciseDrawerProps {
  open: boolean;
  data?: ExerciseWithLabel;
  close: () => void;
}

export const EditExerciseDrawer = ({
  open,
  data,
  close,
}: EditExerciseDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={close}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Exercise</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 mb-2">
          {data && <EditExerciseForm defaultValues={data} onSuccess={close} />}
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline" onClick={close}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

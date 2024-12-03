import {Label } from "@prisma/client";
import { LabelItem } from "./label-item";

interface LabelListProps {
  data: Pick<Label, "id" | "name"|"color">[];
}

export const LabelList = ({ data }: LabelListProps) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="h-0 space-y-4">
        {data.map((label) => (
          <LabelItem key={label.id} data={label} />
        ))}
      </div>
    </div>
  );
};

import { Label } from "@prisma/client";
import chroma from "chroma-js";
interface LabelItemProps {
  data: Pick<Label, "id" | "name" | "color">;
}

export const LabelItem = ({ data }: LabelItemProps) => {
  return (
    <div
      style={{ backgroundColor: chroma(data.color).alpha(0.1).css() }}
      className="text-neutral-600 px-4 p-2 rounded-md text-lg font-semibold flex items-center"
    >
      <div
        className="size-6 mr-2 rounded-md"
        style={{ backgroundColor: data.color }}
      />
      {data.name}
    </div>
  );
};

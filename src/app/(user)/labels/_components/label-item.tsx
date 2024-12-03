import { Label } from "@prisma/client";

interface LabelItemProps {
  data: Pick<Label, "id" | "name" | "color">;
}

export const LabelItem = ({ data }: LabelItemProps) => {
  return (
    <div className="bg-neutral-100 text-neutral-600 px-4 p-2 rounded-md text-lg font-semibold flex items-center">
      <div className="size-6 mr-2 rounded-md" style={{backgroundColor:data.color}}/>
      {data.name}
    </div>
  );
};

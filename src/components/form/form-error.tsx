import { TriangleAlert } from "lucide-react";

export const FormError = ({ message }: { message: string }) => {
  return (
    <div className="w-full flex items-center bg-rose-200 border border-rose-300 p-2 rounded-md text-rose-500 font-semibold">
      <TriangleAlert className="mr-2 size-5" />
      {message}
    </div>
  );
};

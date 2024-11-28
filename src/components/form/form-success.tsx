import { CheckCircle } from "lucide-react";

export const FormSuccess = ({ message }: { message: string }) => {
  return (
    <div className="w-full flex items-center bg-emerald-200 border border-emerald-300 p-2 rounded-md text-emerald-500 font-semibold">
      <CheckCircle className="mr-2 size-5" />
      {message}
    </div>
  );
};

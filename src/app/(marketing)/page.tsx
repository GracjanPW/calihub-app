import { Button } from "@/components/ui/button";
import { Check, Package } from "lucide-react";

const MarketingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center h-[500px] space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="font-bold flex items-center text-3xl bg-red-500 text-white p-2 px-4 rounded-md tracking-wider">
          ALL IN 1
          <Package className="ml-2 size-8" />
        </div>
        <h1 className="text-4xl font-semibold">
          Everything you need for calisthenics
        </h1>
        <div className="flex flex-col items-center pl-4">
          <p className="text-md flex items-center font-medium text-muted-foreground">
            Track progress
            <Check className="ml-2 size-4 text-emerald-600" />
          </p>
          <p className="text-md flex items-center font-medium text-muted-foreground">
            Create workouts
            <Check className="ml-2 size-4 text-emerald-600" />
          </p>
          <p className="text-md flex items-center font-medium text-muted-foreground">
            Customize workout plans
            <Check className="ml-2 size-4 text-emerald-600" />
          </p>
        </div>
      </div>

      <Button className="bg-red-800 font-bold text-md">Get Started Now!</Button>
    </div>
  );
};

export default MarketingPage;

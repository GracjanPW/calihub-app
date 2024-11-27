import { Button } from "@/components/ui/button";
import { Copyright } from "lucide-react";

export const MarketingFooter = () => {
  return (
    <footer className="fixed bottom-0 w-full p-4 border-t bg-slate-100">
      <div className="md:max-w-screen-xl mx-auto flex items-center w-full justify-between">
        <p className="font-semibold flex items-center">
          Calihub
          <Copyright className="ml-1 size-4" />
        </p>
        <div className="space-x-4 md:block md:w-auto flex items-center justify-end w-full">
          <Button size={"sm"} variant={"ghost"} className="font-bold">
            Privacy Policy
          </Button>
          <Button size={"sm"} variant={"ghost"} className="font-bold">
            Terms of Service
          </Button>
        </div>
      </div>
    </footer>
  );
};

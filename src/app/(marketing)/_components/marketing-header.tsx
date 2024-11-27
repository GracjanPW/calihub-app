import { Button } from "@/components/ui/button";
import { Roboto } from "next/font/google";
import Link from "next/link";

const font = Roboto({
  subsets: ["latin"],
  weight: ["700"],
  style: "italic",
});

export const MarketingHeader = () => {
  return (
    <header className="w-full h-[60px] flex justify-center items-center px-5 bg-neutral-50 shadow-sm">
      <div className="max-w-4xl w-full flex items-center justify-between">
        <div
          className={`${font.className} tracking-wide text-neutral-800 text-xl`}
        >
          CALIHUB
        </div>
        <div className="space-x-2">
          <Button variant={"ghost"} size={"sm"} asChild>
            <Link href="/auth/sign-up">
              Sign up
            </Link>
          </Button>
          <Button size={"sm"} asChild>
            <Link href="/auth/sign-in">
              Login
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

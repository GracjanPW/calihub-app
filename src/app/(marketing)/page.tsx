import { Button } from "@/components/ui/button";

const MarketingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center h-[500px] space-y-3">
      <h1 className="text-3xl font-bold">Calihub</h1>
      <h2 className="text-4xl font-semibold border border-rounded-md">Everything you need for calisthenics</h2>
      <p>Track progress</p>
      <p>Create workouts</p>
      <p>Custom workout plans</p>
      <Button className="bg-rose-800 font-bold text-md">Get Started</Button>
    </div>
  );
};

export default MarketingPage;

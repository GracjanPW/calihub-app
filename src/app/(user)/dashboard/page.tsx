import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/page-header";
import { getScheduleByDate } from "@/lib/db/schedule";
import { PreviewWorkout } from "./_components/preview-workout";

const DashboardPage = async () => {
  const today = new Date();
  const todaysWorkout = await getScheduleByDate(today.toDateString());
  return (
    <div className="relative px-6 space-y-4 flex-1 flex flex-col pb-4">
      <PageHeader>
        <h1 className="text-2xl font-semibold tracking-wider text-neutral-100">
          Dashboard
        </h1>
        <h2 className="text-xl text-neutral-100">Today is chest</h2>
      </PageHeader>
      <div className="w-full text-center border rounded-md p-2 font-semibold text-xl text-neutral-700">
        Today&apos;s workout
      </div>
      <PreviewWorkout data={todaysWorkout} />
      <Button className="w-full text-xl" size={"lg"} variant={"primary"}>
        Start workout
      </Button>
    </div>
  );
};

export default DashboardPage;

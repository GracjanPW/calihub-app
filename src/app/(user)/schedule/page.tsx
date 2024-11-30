import { getSchedule } from "@/lib/db/schedule";
import { PageHeader } from "../_components/page-header";
import { WeekSelector } from "./_components/week-selector";
import { ScheduleList } from "./_components/schedule-list";

const SchedulePage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    from: string;
    to: string;
  }>;
}) => {
  const { from, to } = await searchParams;
  const today = new Date();

  const schedule = await getSchedule(from, to);

  return (
    <div className="relative px-6 space-y-4 flex-1 pb-4 flex flex-col">
      <PageHeader>
        <h1 className="text-3xl font-semibold tracking-wider text-neutral-800">
          Schedule
        </h1>
      </PageHeader>
      <WeekSelector defaultTo={to} defaultFrom={from} today={today} />
      <ScheduleList data={schedule} />
    </div>
  );
};

export default SchedulePage;

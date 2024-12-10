import { getSchedule } from '@/lib/db/schedule';
import { PageHeader } from '../_components/page-header';
import { WeekSelector } from './_components/week-selector';
import { ScheduleList } from './_components/schedule-list';
import { getDateRange } from '@/lib/utils';

const SchedulePage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    from: string;
    to: string;
  }>;
}) => {
  let { from, to } = await searchParams;
  if (!from || !to) {
    const { from: defaultFrom, to: defaultTo } = getDateRange(new Date());
    from = defaultFrom;
    to = defaultTo;
  }

  const schedule = await getSchedule(from, to);

  return (
    <div className='relative flex flex-1 flex-col justify-start space-y-4 px-6 pb-4'>
      <PageHeader>
        <h1 className='text-2xl font-semibold tracking-wider text-neutral-100'>
          Schedule
        </h1>
      </PageHeader>
      <WeekSelector defaultTo={to} defaultFrom={from} />
      <ScheduleList data={schedule} />
    </div>
  );
};

export default SchedulePage;

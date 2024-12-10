import { Button } from '@/components/ui/button';
import { PageHeader } from '../_components/page-header';
import { getScheduleByDate } from '@/lib/db/schedule';
import { PreviewWorkout } from './_components/preview-workout';

const DashboardPage = async () => {
  const today = new Date();
  const todaysWorkout = await getScheduleByDate(today.toDateString());
  return (
    <div className='relative flex flex-1 flex-col space-y-4 px-6 pb-4'>
      <PageHeader>
        <h1 className='text-2xl font-semibold tracking-wider text-neutral-100'>
          Dashboard
        </h1>
        <h2 className='text-xl text-neutral-100'>Today is chest</h2>
      </PageHeader>
      <div className='w-full rounded-md border p-2 text-center text-xl font-semibold text-neutral-700'>
        Today&apos;s workout
      </div>
      <PreviewWorkout data={todaysWorkout} />
      <Button className='w-full text-xl' size={'lg'} variant={'primary'}>
        Start workout
      </Button>
    </div>
  );
};

export default DashboardPage;

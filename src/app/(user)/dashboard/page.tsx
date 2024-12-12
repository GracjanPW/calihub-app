import { PageHeader } from '../_components/page-header';
import { TodaysWorkout } from './_components/todays-workout';
import { Suspense } from 'react';

const DashboardPage = async () => {
  return (
    <div className='relative flex flex-1 flex-col space-y-4 px-6 pb-4'>
      <PageHeader>
        <h1 className='text-2xl font-semibold tracking-wider text-neutral-100'>
          Dashboard
        </h1>
      </PageHeader>
      <Suspense fallback={<TodaysWorkout.skeleton />}>
        <TodaysWorkout />
      </Suspense>
    </div>
  );
};

export default DashboardPage;

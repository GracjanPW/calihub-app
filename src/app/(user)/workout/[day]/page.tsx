import { getScheduleByDate } from '@/lib/db/schedule';
import { PageHeader } from '../../_components/page-header';
import { getMostRelavantLabel } from '@/lib/utils';
import { PreviewWorkout } from '../_components/preview-workout';

const WorkoutDayPage = async ({
  params,
}: {
  params: Promise<{ day: string }>;
}) => {
  const { day } = await params;
  const todaysWorkout = await getScheduleByDate(day);
  const label = getMostRelavantLabel(todaysWorkout);
  return (
    <div className='relative flex flex-1 flex-col space-y-4 px-6 pb-4'>
      <PageHeader>
        <h1 className='text-2xl font-semibold tracking-wider text-neutral-100'>
          {label} Workout
        </h1>
      </PageHeader>
      <PreviewWorkout data={todaysWorkout} />
    </div>
  );
};

export default WorkoutDayPage;

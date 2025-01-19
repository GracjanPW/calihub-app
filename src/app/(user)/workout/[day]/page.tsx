import { getScheduleByDate } from '@/lib/db/schedule';
import { PageHeader } from '../../_components/page-header';
import { getMostRelavantLabel } from '@/lib/utils';
import { PreviewWorkout } from '../_components/preview-workout';
import { ProgressBar } from '@/components/progress-bar';
import { ExerciseSet } from '@prisma/client';

const WorkoutDayPage = async ({
  params,
}: {
  params: Promise<{ day: string }>;
}) => {
  const { day } = await params;
  const todaysWorkout = await getScheduleByDate(day);
  const label = getMostRelavantLabel(todaysWorkout);
  const sets = todaysWorkout.reduce((a, i) => {
      return [...a, ...i.exerciseSets];
    }, [] as ExerciseSet[]);
    const completedSet = sets.filter((i) => i.completed);
  return (
    <div className='relative flex flex-1 flex-col space-y-4 px-6 pb-4'>
      <PageHeader>
        <h1 className='text-2xl font-semibold tracking-wider text-neutral-100 pb-2'>
          {label} Workout
        </h1>
        {
          sets.length > 0 && (<ProgressBar current={completedSet.length} target={sets.length}/>)
        }
      </PageHeader>
      <PreviewWorkout data={todaysWorkout} day={day} />
    </div>
  );
};

export default WorkoutDayPage;

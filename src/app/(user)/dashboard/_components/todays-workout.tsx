import { getScheduleByDate } from '@/lib/db/schedule';
import { getMostRelavantLabel } from '@/lib/utils';
import { format } from 'date-fns';
import Link from 'next/link';

export const TodaysWorkout = async () => {
  const today = new Date();
  const todaysWorkout = await getScheduleByDate(today.toDateString());
  const label = getMostRelavantLabel(todaysWorkout);

  return (
    <div>
      {todaysWorkout.length > 0 ? (
        <Link href={`/workout/${format(today, 'yyyy-MM-dd')}`}>
          <div className='w-full space-y-2 rounded-md border bg-neutral-100 px-4 py-3 text-center shadow-sm shadow-neutral-700'>
            <p className='text-sm text-muted-foreground'>Today&apos;s Workout</p>
            <p className='text-xl font-semibold text-neutral-700'>{label}</p>
            <p className='text-xs text-muted-foreground'>
              {todaysWorkout.length} Exercises
            </p>
          </div>
        </Link>
      ) : (
        <div>No scheduled workout today!</div>
      )}
    </div>
  );
};

TodaysWorkout.skeleton = () => {
  return <div>loading</div>;
};

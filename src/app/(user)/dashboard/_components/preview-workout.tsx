import { Separator } from '@/components/ui/separator';
import { SchedulePopulated } from '@/type';
import chroma from 'chroma-js';

interface PreviewWorkoutProps {
  data: SchedulePopulated[];
}

export const PreviewWorkout = ({ data }: PreviewWorkoutProps) => {
  return (
    <div className='flex-1 overflow-y-auto'>
      <div className='h-0 space-y-4'>
        {data.map((schedule) => (
          <div key={schedule.id}>
            <div className='flex items-center space-x-3 rounded-md p-1 px-3 text-lg font-medium text-neutral-700'>
              <p>{schedule.exercise.name}</p>
              <div className='ml-1 flex space-x-1'>
                {schedule.exercise.exerciseLabels.map(({ label }) => (
                  <div
                    key={`${label.name}-${label.color}`}
                    style={{ backgroundColor: chroma(label.color).css() }}
                    className='size-2 rounded-full'
                  />
                ))}
              </div>
            </div>
            <Separator />
            <div className='p-2'>
              {schedule.exerciseSets.map((set) => (
                <div key={set.id} className='leading-6 text-muted-foreground'>
                  {set.order + 1}:{' '}
                  {Number(set.weight) > 0 ? set.weight + 'kg ' : null}
                  {Number(set.reps) > 0
                    ? (Number(set.weight) > 0 ? 'for ' : '') +
                      set.reps +
                      ' reps '
                    : null}
                  {Number(set.duration) > 0
                    ? (Number(set.reps) > 0 || Number(set.weight) > 0
                        ? 'for '
                        : '') +
                      set.duration +
                      's'
                    : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

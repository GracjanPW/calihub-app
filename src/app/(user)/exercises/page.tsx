import { getAllExercises } from '@/lib/db/exercise';
import { AddExerciseDrawer } from './_components/add-exercise-drawer';
import { ExerciseList } from './_components/exercise-list';
import { PageHeader } from '../_components/page-header';

const ExercisesPage = async () => {
  const exercises = await getAllExercises();
  return (
    <div className='relative flex h-full flex-1 flex-col space-y-4 px-6 pb-4'>
      <PageHeader>
        <h1 className='text-2xl font-semibold tracking-wider text-neutral-100'>
          Exercises
        </h1>
      </PageHeader>
      <ExerciseList data={exercises} />
      <AddExerciseDrawer />
    </div>
  );
};

export default ExercisesPage;

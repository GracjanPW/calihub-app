import { getAllExercises } from "@/lib/db/exercise";
import { AddExerciseDrawer } from "./_components/add-exercise-drawer";
import { ExerciseList } from "./_components/exercise-list";

const ExercisesPage = async () => {
  const exercises = await getAllExercises();
  return (
    <div className="relative px-6 space-y-4 flex-1 flex flex-col pb-4">
      <div className="min-h-[100px] w-full -mt-20 bg-neutral-400 m-auto rounded-md p-4 flex justify-center items-center">
        <h1 className="text-3xl font-semibold tracking-wider text-neutral-800">
          Exercises
        </h1>
      </div>
      <ExerciseList data={exercises} />
      <AddExerciseDrawer />
    </div>
  );
};

export default ExercisesPage;

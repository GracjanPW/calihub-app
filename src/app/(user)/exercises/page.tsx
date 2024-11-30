import { getAllExercises } from "@/lib/db/exercise";
import { AddExerciseDrawer } from "./_components/add-exercise-drawer";
import { ExerciseList } from "./_components/exercise-list";
import { PageHeader } from "../_components/page-header";

const ExercisesPage = async () => {
  const exercises = await getAllExercises();
  return (
    <div className="relative px-6 space-y-4 flex-1 flex flex-col pb-4">
      <PageHeader>
        <h1 className="text-2xl font-semibold tracking-wider text-neutral-100">
            Exercises
        </h1>
      </PageHeader>
      <ExerciseList data={exercises} />
      <AddExerciseDrawer />
    </div>
  );
};

export default ExercisesPage;

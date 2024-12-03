

import { getLabels } from "@/lib/db/labels";
import { PageHeader } from "../_components/page-header";
import { LabelList } from "./_components/label-list";
import { AddLabelDrawer } from "./_components/add-label-drawer";

const LabelPage = async () => {
  const labels = await getLabels();
  return (
    <div className="relative px-6 space-y-4 flex-1 flex flex-col pb-4">
      <PageHeader>
        <h1 className="text-2xl font-semibold tracking-wider text-neutral-100">
            Labels
        </h1>
      </PageHeader>
      <LabelList data={labels} />
      <AddLabelDrawer />
    </div>
  );
};

export default LabelPage;
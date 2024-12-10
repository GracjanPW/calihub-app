import { getLabels } from '@/lib/db/labels';
import { PageHeader } from '../_components/page-header';
import { LabelList } from './_components/label-list';
import { AddLabelDrawer } from './_components/add-label-drawer';

const LabelPage = async () => {
  const labels = await getLabels();
  return (
    <div className='relative flex flex-1 flex-col space-y-4 px-6 pb-4'>
      <PageHeader>
        <h1 className='text-2xl font-semibold tracking-wider text-neutral-100'>
          Labels
        </h1>
      </PageHeader>
      <LabelList data={labels} />
      <AddLabelDrawer />
    </div>
  );
};

export default LabelPage;

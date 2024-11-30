import { PageHeader } from "../_components/page-header";
import { WeekSelector } from "./_components/week-selector";

const SchedulePage = async ({
  searchParams
}:{
  searchParams: {
    from:string,
    to:string
  }
}) => {
  const {from,to} = await searchParams
  const today = new Date()
  return ( 
    <div className="relative px-6 space-y-4 flex-1 pb-4">
      <PageHeader>
        <h1 className="text-3xl font-semibold tracking-wider text-neutral-800">
          Schedule
        </h1>
      </PageHeader>
      <WeekSelector defaultTo={to} defaultFrom={from} today={today}/>
    </div>
   );
}
 
export default SchedulePage;
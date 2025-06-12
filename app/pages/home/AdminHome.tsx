import Overview from "@/components/overview/Overview";
import StudentGenderDistribution from "@/components/charts/StudentGenderDistribution";
import Events from "@/components/events/Events";
import FinancesOverview from "@/components/overview/FinancesOverview";
import ActiveStudentsByClass from "@/components/charts/ActiveStudentsByClass";
import YearlyCalendar from "@/components/events/Calendar";

function AdminHome() {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-3 mt-2 pb-3 w-full h-full overflow-hidden ">
      <div className="flex flex-col gap-3 overflow-y-auto hide-scrollbar rounded-[var(--radius)]">
        <Overview />
        <div className="grid gap-3 w-full grid-cols-2">
          <StudentGenderDistribution />
          <ActiveStudentsByClass />
        </div>
        <FinancesOverview />
      </div>

      {/* <Events /> */}
      <div className="grid grid-rows-[auto_1fr] h-full overflow-hidden gap-2 mt-4">
        <YearlyCalendar year={2025} className={"w-[16rem]"} />
        <Events />
      </div>
    </div>
  );
}

export default AdminHome;

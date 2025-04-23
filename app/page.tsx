import "@/css/index.css";

import Overview from "@/components/overview/Overview";
import TeacherGenderDistribution from "@/components/charts/TeacherGenderDistribution";
import StudentGenderDistribution from "@/components/charts/StudentGenderDistribution";
import Events from "@/components/events/Events";
import FinancesOverview from "@/components/overview/FinancesOverview";

function Home() {
  return (
    <div className="flex flex-col gap-3 mt-2 pb-3 w-full h-full overflow-y-auto hide-scrollbar">
      <Overview />
      <div className="charts-events grid gap-3">
        <div className="charts grid gap-3">
          <StudentGenderDistribution />
          <TeacherGenderDistribution />
          <FinancesOverview />
        </div>
        <Events />
      </div>
    </div>
  );
}

export default Home;

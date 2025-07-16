import YearlyCalendar from "@/components/events/Calendar";
import Events from "@/components/events/Events";
import GuardianOverview from "@/components/overview/guardian/GuardianOverview";
import ChevronRight from "@/components/svg/ChevronRight";
import NumberFlow from "@number-flow/react";
import React from "react";

function GuardianHome() {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-3 pb-3 pt-4 w-full h-full overflow-hidden ">
      <div className="flex flex-col gap-3 h-full overflow-y-auto hide-scrollbar rounded-[var(--radius)]">
        <div className="guardian-overview grid gap-3 grid-cols-[1fr_13rem]">
          <GuardianOverview />
          
          <div className="p-2 grid-rows-[auto_1fr] flex flex-col gap-2 rounded-[var(--radius)] border-[1px] border-[var(--border)]">
            <span className="font-semibold opacity-85 font-p-2">
              Total Fees balance
            </span>
            <h1 className="font-h-1 opacity-75">
              K{" "}
              <NumberFlow
                value={100000.9}
                format={{ maximumFractionDigits: 2, minimumFractionDigits: 2 }}
              />
            </h1>
            <span
              style={{ height: "2rem", width: "100%" }}
              className="cta-2 w-full rounded-[calc(var(--radius-s)_*_0.75)] font-semibold opacity-75 flex items-center justify-center border-[1px] border-[var(--border)] font-p-3 p-1.5"
            >
              Invoices
              <span className="flex h-3 w-3 opacity-50">
                <ChevronRight />
              </span>
            </span>
          </div>
        </div>

        <div className="w-full grid grid-rows-[auto_1fr] gap-2">
            <div className="flex  font-semibold opacity-75 w-full justify-between items-center">
              My kids
            </div>
        </div>
      </div>

      {/* <Events /> */}
      <div className="grid grid-rows-[auto_1fr] h-full overflow-hidden gap-2">
        <YearlyCalendar year={2025} className={"w-[16rem]"} />
        <Events />
      </div>
    </div>
  );
}

export default GuardianHome;

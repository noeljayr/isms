import { FinancialSummary } from "../charts/FinancialSummary";

function FinancesOverview() {
  return (
    <div className="flex flex-col p-2 rounded-[var(--radius)] border-[1px] border-[var(--border)] financial-summary">
      <div className="font-semibold font-p-2 opacity-65">Annual Financial summary</div>
     
        <div className="w-full h-[14rem] mt-1 chart">
          <FinancialSummary />
        </div>
     
    </div>
  );
}

export default FinancesOverview;

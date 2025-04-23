import { FinancialSummary } from "../charts/FinancialSummary";

function FinancesOverview() {
  return (
    <div className="card financial-summary">
      <div className="card-title">Annual Financial summary</div>
      <div className="card-body overflow-hidden h-full w-full flex">
        <div className="w-full h-full chart">
          <FinancialSummary />
        </div>
      </div>
    </div>
  );
}

export default FinancesOverview;

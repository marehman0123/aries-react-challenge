import ContractStats from "@/ts/types/ContractStats.type";

const TotalPayoffStats = ({ stats }: { stats: ContractStats }) => {
  const { maxLoss, maxProfit } = stats;

  return (
    <div className="flex gap-6">
      <StatsCard title="Maximum Profit" value={maxProfit} />
      <StatsCard title="Maximum Loss" value={maxLoss} />
    </div>
  );
};

const StatsCard = ({ title, value }: { title: string; value: number | string }) => (
  <div className="w-full rounded-xl border-2 p-4">
    <p className="mb-2 font-semibold text-neutral-500">{title}</p>
    <p className="text-4xl font-bold">{value}</p>
  </div>
);

export default TotalPayoffStats;

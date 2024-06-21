import { BackgroundColorScheme, ColorScheme } from "@/ts/enum/ColorScheme.enum";
import ContractStats from "@/ts/types/ContractStats.type";
import { Tag } from "antd";
import { isNil } from "lodash";

interface SingleContractStatsProps {
  index: number;
  stats: ContractStats;
}

const SingleContractStats = ({ index, stats }: SingleContractStatsProps) => {
  const { breakevenPoint, maxLoss, maxProfit } = stats;

  return (
    <div
      className="w-full rounded-xl border p-4 text-xs"
      style={{
        backgroundColor: BackgroundColorScheme[index],
        borderColor: ColorScheme[index],
      }}
    >
      <Tag color={ColorScheme[index]} className="mb-1 font-bold">
        Contract #{index + 1}
      </Tag>
      <p className="">
        Maximum Profit: <span className="font-semibold">{maxProfit}</span>
      </p>
      <p className="">
        Maximum Loss: <span className="font-semibold">{maxLoss}</span>
      </p>
      <p className="">
        Breakeven Point: <span className="font-semibold">{!isNil(breakevenPoint) ? breakevenPoint : "-"}</span>
      </p>
    </div>
  );
};

export default SingleContractStats;

import ContractPosition from "@/ts/enum/ContractPosition.enum";
import ContractType from "@/ts/enum/ContractType.enum";
import ContractStats from "@/ts/types/ContractStats.type";
import LineChartDataPoint from "@/ts/types/LineChartDataPoint.type";
import OptionsContract from "@/ts/types/OptionsContract.type";
import { maxBy, minBy, round } from "lodash";

interface useLineChartProps {
  contracts: OptionsContract[];
}

interface useLineChartReturnProps {
  dataPoints: LineChartDataPoint[];
  statistics: ContractStats[];
}

const useLineChart = ({ contracts }: useLineChartProps): useLineChartReturnProps => {
  if (contracts.length === 0) return { dataPoints: [], statistics: [] };

  const assetPriceRange = generateAssetPriceRange({ contracts });
  const dataPoints = calculateChartDataPoints({ assetPriceRange, contracts });
  const statistics = calculateStatistics({ contracts, dataPoints });

  return { dataPoints, statistics };
};

export default useLineChart;

/**
 * generateAssetPriceRange
 * TODO: complete function working
 * @param contracts Array of all options contracts
 * @returns Array of range of asset prices (x-axis range).
 */
const generateAssetPriceRange = ({ contracts }: { contracts: OptionsContract[] }): number[] => {
  const minStrikePrice = minBy(contracts, "strikePrice")?.strikePrice || 0;
  const maxStrikePrice = maxBy(contracts, "strikePrice")?.strikePrice || 0;

  const breakevenPoints = contracts.map(({ strikePrice, type, premium }) => {
    return type === ContractType.Call ? strikePrice + premium : strikePrice - premium;
  });
  const minBreakevenPoint = Math.min(...breakevenPoints);
  const maxBreakevenPoint = Math.max(...breakevenPoints);

  const startingRange = Math.min(minStrikePrice, minBreakevenPoint);
  const endRange = Math.max(maxStrikePrice, maxBreakevenPoint);

  const assetPrices = [];
  for (let i = startingRange > 0 ? startingRange : 0; i <= endRange; i++) assetPrices.push(i);

  return assetPrices;
};

/**
 * calculateChartDataPoints
 * * Function is used to calculate individual data-points (x,y co-ord) to be placed on chart.
 * TODO: complete function working
 * @param assetPriceRange Array of asset price range (x-axis of chart)
 * @param contracts Array of all options contracts
 * @returns Array of LineChartDataPoint i.e profit/loss (y-axis point) of each contract at underlying asset price (x-axis point)
 */
const calculateChartDataPoints = ({
  assetPriceRange,
  contracts,
}: {
  assetPriceRange: number[];
  contracts: OptionsContract[];
}): LineChartDataPoint[] => {
  return assetPriceRange.map((assetPrice) => {
    let totalPL = 0;
    const dataPoint: LineChartDataPoint = { assetPrice, totalPL };

    contracts?.forEach((contract, index) => {
      const contractID = `contract${index + 1}PL`;
      const payoff = calculateProfitLoss({ assetPrice, contract });
      dataPoint[contractID] = payoff;
      totalPL += payoff;
    });

    return { ...dataPoint, totalPL: round(totalPL, 2) };
  });
};

/**
 * calculateProfitLoss
 * * Function is used to calculate profit loss for an option at a specific asset price.
 * TODO: complete function working
 * @param assetPrice Price of underlying asset
 * @param contract Options contract
 */
const calculateProfitLoss = ({ assetPrice, contract }: { assetPrice: number; contract: OptionsContract }) => {
  const { position, premium, strikePrice, type } = contract;

  const intrinsicValue = Math.max(0, type === ContractType.Call ? assetPrice - strikePrice : strikePrice - assetPrice);
  const profitLoss = position === ContractPosition.Long ? intrinsicValue - premium : premium - intrinsicValue;

  return round(profitLoss, 2);
};

/**
 * calculateStatistics
 * TODO: complete function working
 */
const calculateStatistics = ({
  contracts,
  dataPoints,
}: {
  contracts: OptionsContract[];
  dataPoints: LineChartDataPoint[];
}) => {
  return contracts?.map((contract, index) => {
    const { strikePrice, premium, type } = contract;
    const contractID = `contract${index + 1}PL`;

    const maxProfit = maxBy(dataPoints, contractID)?.[contractID] ?? Infinity;
    const maxLoss = minBy(dataPoints, contractID)?.[contractID] ?? -Infinity;
    const breakevenPoint = round(type === ContractType.Call ? strikePrice + premium : strikePrice - premium, 2);

    return { maxProfit, maxLoss, breakevenPoint };
  });
};

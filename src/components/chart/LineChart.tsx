import { ColorScheme } from "@/ts/enum/ColorScheme.enum";
import LineChartDataPoint from "@/ts/types/LineChartDataPoint.type";
import OptionsContract from "@/ts/types/OptionsContract.type";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface LineChartProps {
  contracts: OptionsContract[];
  dataPoints: LineChartDataPoint[];
}

const LineChart = ({ contracts, dataPoints }: LineChartProps) => (
  <ResponsiveContainer>
    <RechartLineChart data={dataPoints}>
      <CartesianGrid strokeDasharray="2" />
      <XAxis dataKey="assetPrice" name="Asset Price" />
      <YAxis />
      <Tooltip />
      <Legend />

      {contracts.map((_, index) => (
        <Line
          key={index}
          type="monotone"
          name={`Contract #${index + 1}`}
          dataKey={`contract${index + 1}PL`}
          stroke={ColorScheme[index]}
          strokeWidth="2"
          dot={false}
        />
      ))}

      {contracts.length > 1 && (
        <Line type="monotone" name="Total Payoff" dataKey="totalPL" stroke="#000000" strokeWidth="3" dot={false} />
      )}
    </RechartLineChart>
  </ResponsiveContainer>
);

export default LineChart;

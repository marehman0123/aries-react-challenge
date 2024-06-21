import LineChart from "@/components/chart/LineChart";
import ContractsForm from "@/components/contracts/ContractsForm";
import SingleContractStats from "@/components/stats/SingleContractStats";
import useLineChart from "@/hooks/useLineChart";
import OptionsContract from "@/ts/types/OptionsContract.type";
import { Empty } from "antd";
import Card from "antd/es/card/Card";
import { useState } from "react";
import "./App.css";

function App() {
  const [contracts, setContracts] = useState<OptionsContract[]>([]);
  const { dataPoints, statistics } = useLineChart({ contracts });

  return (
    <div className="flex h-full gap-9 p-9">
      <Card
        title="OPTIONS CONTRACTS"
        className="w-1/4 overflow-hidden rounded-xl border-black"
        classNames={{
          header: "!bg-black !font-black !text-white",
          body: "w-full h-[calc(100%-96px)] overflow-scroll bg-neutral-50 !p-0",
        }}
      >
        <ContractsForm setContracts={setContracts} />
      </Card>
      {contracts.length > 0 ? (
        <div className="flex h-full w-3/4 flex-col gap-4">
          <div className="flex gap-6">
            {contracts?.map((_, index) => <SingleContractStats index={index} stats={statistics[index]} />)}
          </div>
          <div className="h-full max-h-[calc(100%-7rem)]">
            <LineChart contracts={contracts} dataPoints={dataPoints} />
          </div>
        </div>
      ) : (
        <div className="flex h-full w-3/4 items-center justify-center">
          <Empty description="Add Contracts and Click 'Create Graph'" />
        </div>
      )}
    </div>
  );
}

export default App;

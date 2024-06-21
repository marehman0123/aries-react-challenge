import ContractPosition from "@/ts/enum/ContractPosition.enum";
import ContractType from "@/ts/enum/ContractType.enum";

type OptionsContract = {
  strikePrice: number;
  type: ContractType;
  premium: number;
  position: ContractPosition;
  expiration?: string;
};

export default OptionsContract;

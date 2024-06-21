import { BackgroundColorScheme, ColorScheme } from "@/ts/enum/ColorScheme.enum";
import ContractPosition from "@/ts/enum/ContractPosition.enum";
import ContractType from "@/ts/enum/ContractType.enum";
import OptionsContract from "@/ts/types/OptionsContract.type";
import CloseCircleOutlined from "@ant-design/icons/CloseCircleOutlined";
import type { FormListFieldData, FormProps } from "antd";
import { Button, Card, Form, InputNumber, Radio } from "antd";

const DEFAULT_FORM_VALUES = [
  { strikePrice: 100, premium: 12.04, type: "call", position: "long" },
  { strikePrice: 102.5, premium: 14, type: "call", position: "long" },
  { strikePrice: 103, premium: 14, type: "put", position: "short" },
  { strikePrice: 105, premium: 18, type: "put", position: "long" },
];

interface ContractsFormProps {
  setContracts: React.Dispatch<React.SetStateAction<OptionsContract[]>>;
}

const ContractsForm = ({ setContracts }: ContractsFormProps) => {
  const [form] = Form.useForm();

  const onFinish: FormProps<{ contracts: OptionsContract[] }>["onFinish"] = (values) => setContracts(values.contracts);

  return (
    <Form
      form={form}
      labelAlign="left"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      className="h-full"
      requiredMark="optional"
      initialValues={{ contracts: DEFAULT_FORM_VALUES }}
    >
      <Form.List name="contracts">
        {(fields, { add, remove }) => (
          <>
            <div className="flex h-full flex-col gap-3 overflow-scroll p-6">
              {fields.map((field, index) => (
                <Card
                  key={field.key}
                  size="small"
                  title={`Contract #${field.name + 1}`}
                  classNames={{ header: "!font-bold !text-white", body: "!pb-0" }}
                  style={{ borderColor: ColorScheme[index], borderRadius: 10 }}
                  styles={{
                    header: { backgroundColor: ColorScheme[index] },
                    body: { backgroundColor: BackgroundColorScheme[index] },
                  }}
                  extra={
                    fields.length > 1 && (
                      <CloseCircleOutlined onClick={() => remove(field.name)} className="text-white" />
                    )
                  }
                >
                  <StrikePriceInput field={field} />
                  <PremiumInput field={field} />
                  <TypeRadioGroup field={field} />
                  <PositionRadioGroup field={field} />
                </Card>
              ))}
            </div>
            <div className="absolute bottom-0 z-10 flex h-12 w-full bg-white">
              <AddContractButton onClick={() => add()} disabled={fields.length === 4} />
              <CreateGraphButton />
            </div>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default ContractsForm;

const StrikePriceInput = ({ field }: { field: FormListFieldData }) => (
  <Form.Item
    label="Strike Price"
    name={[field.name, "strikePrice"]}
    rules={[{ required: true, message: "Strike Price is required" }]}
    className="font-medium"
  >
    <InputNumber addonBefore="$" className="w-full" min={1} />
  </Form.Item>
);

const PremiumInput = ({ field }: { field: FormListFieldData }) => (
  <Form.Item
    label="Premium"
    name={[field.name, "premium"]}
    rules={[{ required: true, message: "Premium is required" }]}
    className="font-medium"
  >
    <InputNumber addonBefore="$" className="w-full" min={1} />
  </Form.Item>
);

const TypeRadioGroup = ({ field }: { field: FormListFieldData }) => (
  <Form.Item
    label="Type"
    name={[field.name, "type"]}
    initialValue={ContractType.Call}
    rules={[{ required: true }]}
    className="font-medium"
  >
    <Radio.Group className="flex [&>*]:w-full">
      <Radio.Button value={ContractType.Call}>Call</Radio.Button>
      <Radio.Button value={ContractType.Put}>Put</Radio.Button>
    </Radio.Group>
  </Form.Item>
);

const PositionRadioGroup = ({ field }: { field: FormListFieldData }) => (
  <Form.Item
    label="Position"
    name={[field.name, "position"]}
    initialValue={ContractPosition.Long}
    rules={[{ required: true }]}
    className="font-medium"
  >
    <Radio.Group className="flex [&>*]:w-full">
      <Radio.Button value={ContractPosition.Long}>Long</Radio.Button>
      <Radio.Button value={ContractPosition.Short}>Short</Radio.Button>
    </Radio.Group>
  </Form.Item>
);

const AddContractButton = ({
  onClick,
  disabled,
}: {
  onClick: React.MouseEventHandler<HTMLElement>;
  disabled: boolean;
}) => (
  <Button
    type="text"
    className="item-center flex h-full w-1/2 justify-center rounded-none bg-green-100 font-bold"
    onClick={onClick}
    disabled={disabled}
  >
    Add Contract
  </Button>
);

const CreateGraphButton = () => (
  <Button
    type="text"
    className="item-center flex h-full w-1/2 justify-center rounded-none bg-blue-100 font-bold"
    htmlType="submit"
  >
    Create Graph
  </Button>
);

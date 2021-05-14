import { useState } from "react";
import { Input, Select, Checkbox } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const { Option } = Select;

type FormFieldTypeProps = {
  type: string;
  props: {
    name: string;
    type: string;
    options?: { label: string; value: string }[];
  };
  updateFormValues: (key: string, value: string | undefined) => void;
};



const FormFieldType = ({
  type,
  props,
  updateFormValues,
}: FormFieldTypeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectChange = (open: boolean) => {
    setIsOpen(open);
  };

  let toRet;
  switch (type) {
    case "text":
      toRet = (
        <Input onChange={(e) => updateFormValues(props.name, e.target.value)} />
      );
      break;
    case "select":
      toRet = (
        <Select onSelect={(value) => updateFormValues(props.name, value?.toString())}
          {...props}
          suffixIcon={
            isOpen ? (
              <FontAwesomeIcon icon={faChevronDown} />
            ) : (
              <FontAwesomeIcon icon={faChevronRight} />
            )
          }
          onDropdownVisibleChange={selectChange}
        >
          {props.options?.map((item) => (
            <Option key={item.value} value={item.value}>
              {item.value}
            </Option>
          ))}
        </Select>
      );
      break;
    case "checkbox":
      toRet = <Checkbox.Group options={props.options} onChange={(e)=>updateFormValues(props.name, e.join(","))} />;
      break;
    default:
      toRet = null;
  }
  return toRet;
};
export default FormFieldType;

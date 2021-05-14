import { createRef } from "react";
import { Form, Button, message } from "antd";
import FormFieldType from "./FormFieldType";
import { FormInstance } from "antd/lib/form";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import "antd/dist/antd.css";

const FormContainer = () => {
  const formRef = createRef<FormInstance>();

  const fields = [
    {
      key: uuidv4(),
      name: "firstname",
      label: "first name",
      type: "text",
      required: true,
      placeholder: "",
      rules: [{ required: true, message: "First name is required" }],
    },
    {
      key: uuidv4(),
      name: "lastname",
      label: "last name",
      type: "text",
      required: true,
      placeholder: "",
      rules: [{ required: true, message: "Last name is required" }],
    },
    {
      key: uuidv4(),
      name: "emailaddress",
      label: "email address",
      type: "text",
      required: true,
      placeholder: "",
      rules: [{ required: true, message: "Email address is required" }],
    },
    {
      key: uuidv4(),
      name: "organization",
      label: "organization",
      type: "text",
      required: false,
      placeholder: "",
      rules: [],
    },
    {
      key: uuidv4(),
      name: "euresident",
      label: "eu resident",
      type: "select",
      required: true,
      placeholder: "- SELECT ONE -",
      rules: [{ required: true, message: "EU resident is required" }],
      options: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
    },
    {
      key: uuidv4(),
      name: "type",
      label: " ",
      type: "checkbox",
      required: true,
      placeholder: "",
      rules: [
        {
          required: true,
          message: "At least one of the checkbox options is required",
        },
      ],
      options: [
        { label: "ADVANCES", value: "advances" },
        { label: "ALERTS", value: "alerts" },
        { label: "OTHER COMUNICATIONS", value: "other comunications" },
      ],
    },
  ];

  const printMessage = (type: string, m: string) => {
    if (type === "success") {
      message.success(m);
      formRef.current!.resetFields();
    } else {
      message.error(m);
    }
  };

  const onFinish = (values: any) => {
    console.log(values);
    axios
      .post(" http://localhost:8080", values)
      .then((response) => {
        console.log(response.data);
        const { status, message } = response.data;
        printMessage(status, message);
      })
      .catch((error) => {
        printMessage("error", error);
      });
  };

  const updateFormValues = (key: string, value: string | undefined) => {
    //console.log(key, value);
    var obj = formRef.current!.getFieldsValue();
    obj[key] = value;
    formRef.current!.setFieldsValue(obj);
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required",
    types: {
      email: "${label} is not a valid email",
      number: "${label} is not a valid number",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  /* eslint-enable no-template-curly-in-string */

  return (
    <div className={"form-container"}>
      <h1>Sign up for email updates</h1>
      <span className={"gray"}>* Indicates Required Field</span>

      <Form
        ref={formRef}
        requiredMark={true}
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        {fields.map((item) => {
          if (item.name === "emailaddress") {
            return (
              <Form.Item
                key={item.key}
                name={item.name}
                label={item.label}
                required={true}
                rules={[{ type: "email", required: true }]}
              >
                <FormFieldType
                  type={item.type}
                  props={item}
                  updateFormValues={updateFormValues}
                />
              </Form.Item>
            );
          } else {
            return (
              <Form.Item {...item}>
                <FormFieldType
                  type={item.type}
                  props={item}
                  updateFormValues={updateFormValues}
                />
              </Form.Item>
            );
          }
        })}

        <Form.Item>
          <Button type="primary" shape="round" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <Form.Item>
          <Button shape="round" htmlType="reset">
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default FormContainer;

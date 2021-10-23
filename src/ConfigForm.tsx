import React, { FunctionComponent, useContext } from 'react';
import { InputNumber, Form, Button, Typography, Select } from 'antd';
import { CardTypes, GameConfigContext } from './GameConfiguration';

const { Option } = Select;

const ConfigForm: FunctionComponent = () => {
  const [state, setState] = useContext(GameConfigContext);
  const [form] = Form.useForm<{ size: number; cardType: CardTypes }>();
  return (
    <Form<{ size: number; cardType: CardTypes }>
      initialValues={{ size: state.size, cardType: state.cardType }}
      form={form}
      onFinish={() => {
        const fields = form.getFieldsValue();
        setState({
          size: fields.size,
          cardType: fields.cardType,
          config: false,
        });
      }}
    >
      <Typography.Title>Game options</Typography.Title>
      <Form.Item
        name={'size'}
        label="Game size"
        rules={[
          {
            type: 'integer',
            required: true,
            min: 2,
            max: 8,
          },
        ]}
      >
        <InputNumber min={2} max={8} />
      </Form.Item>
      <Form.Item
        name={'cardType'}
        label="Card type"
        rules={[
          {
            required: true,
            type: 'enum',
            enum: Object.values(CardTypes),
          },
        ]}
      >
        <Select>
          <Option value={CardTypes.Color}>Color</Option>
          <Option value={CardTypes.Image}>Image</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Confirm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ConfigForm;

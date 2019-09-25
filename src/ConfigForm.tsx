import React, { FunctionComponent, useContext } from 'react';
import { InputNumber, Form, Button, Typography, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { CardTypes, GameConfigContext } from './GameConfiguration';

const { Option } = Select;

const ConfigForm: FunctionComponent<FormComponentProps> = ({ form }) => {
  const [state, setState] = useContext(GameConfigContext);
  const { getFieldDecorator, validateFields } = form;
  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        validateFields((err, fields) => {
          setState({
            size: fields.size,
            cardType: fields.type,
            config: false,
          });
        });
      }}
    >
      <Typography.Title>Game options</Typography.Title>
      <Form.Item label="Game size">
        {getFieldDecorator('size', {
          rules: [
            {
              type: 'integer',
              required: true,
              min: 2,
              max: 8,
            },
          ],
          initialValue: state.size,
        })(<InputNumber min={2} max={8} />)}
      </Form.Item>
      <Form.Item label="Card type">
        {getFieldDecorator('type', {
          rules: [
            {
              required: true,
              type: 'enum',
              enum: Object.values(CardTypes),
            },
          ],
          initialValue: state.cardType,
        })(
          <Select>
            <Option value={CardTypes.Color}>Color</Option>
            <Option value={CardTypes.Image}>Image</Option>
          </Select>,
        )}
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Confirm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create<FormComponentProps>()(ConfigForm);

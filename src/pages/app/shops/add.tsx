import { Button, Form, Input, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Api, Mappers, Types } from 'modules/shops';
import React from 'react';

interface AddProps {
  onSuccess?: () => void;
}
const Add: React.FC<AddProps> = ({ onSuccess }) => {
  const [loading, setLoading] = React.useState(false);
  const [form] = useForm<Types.IForm.Add>();

  const onFinish = async (values: Types.IForm.Add) => {
    try {
      setLoading(true);
      const { data } = await Api.Add(values);
      const shop = Mappers.Shop(data);
      message.success(`Shop ${shop.title} added successfully`);
      setLoading(false);
      form.resetFields();
      onSuccess!();
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="m-0">Add Page</h1>
      <Form form={form} onFinish={onFinish} className="flex flex-col gap-2">
        <Form.Item<Types.IForm.Add>
          className="m-0"
          name="title"
          rules={[{ required: true, message: 'Please input shop title!' }]}
        >
          <Input size="large" placeholder="Title" />
        </Form.Item>
        <Form.Item<Types.IForm.Add>
          className="m-0"
          name="location"
          rules={[{ required: true, message: 'Please input shop location!' }]}
        >
          <Input size="large" placeholder="Location" />
        </Form.Item>
        <Form.Item<Types.IForm.Add>
          className="m-0"
          name="phone"
          rules={[{ required: true, message: 'Please input shop phone!' }]}
        >
          <Input size="large" placeholder="Phone" />
        </Form.Item>
        <Form.Item<Types.IForm.Add>
          className="m-0"
          name="number"
          rules={[{ required: true, message: 'Please input shop number!' }]}
        >
          <Input size="large" placeholder="Number" />
        </Form.Item>

        <Button loading={loading} size="large" type="primary" htmlType="submit">
          Add Shop
        </Button>
      </Form>
    </div>
  );
};

export default Add;

import React from 'react';
import { Button, Form, Input } from 'antd';
import { Api, Types } from 'modules/shops';
import { useForm } from 'antd/es/form/Form';

interface DataProps {
  shopId: string;
  onSuccess?: () => void;
}
  
   
  
const Data: React.FC<DataProps> = (onSuccess, shopId ) => {
  const [form] = useForm();


  const addPurches = async (formData:any[]) => {


    console.log(formData);
   
    try {
      const response = await Api.Shops({shopId, formData });
      console.log('New purchase added:', response.data);
      onSuccess()
    } catch (error) {
      console.error('Error adding purchase:', error);
    }
  };
  

 
  return (
    <div>
      <div>
        <h1 className="m-0">Add Shops</h1>
        <Form form={form} onFinish={addPurches} className="flex flex-col gap-2">
          <Form.Item className="m-0" name="name" rules={[{ required: true, message: 'Please input shop name!' }]}>
            <Input size="large" placeholder="Name" />
          </Form.Item>
          <Form.Item className="m-0" name="price" rules={[{ required: true, message: 'Please input shop price!' }]}>
            <Input size="large" placeholder="Price" />
          </Form.Item>
          <Form.Item className="m-0" name="amount" rules={[{ required: true, message: 'Please input shop amount!' }]}>
            <Input size="large" placeholder="Amount" />
          </Form.Item>
          <Button size="large" type="primary" htmlType="submit">
            Add Shop
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Data;

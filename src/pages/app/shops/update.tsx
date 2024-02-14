import { Button, Form, Input, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Api, Mappers, Types } from 'modules/shops';
import React, { useState } from 'react';

interface UpdateProps {
  onSuccess?: () => void;
  shopId: string;
}

const Update: React.FC<UpdateProps> = ({ onSuccess, shopId }) => {
  const [loading, setLoading] = useState(false);
  const [form] = useForm<Types.IForm.Update>();
  const [inputChecked, setInputChecked] = useState(false);
  const [sellerData, setSellerData] = useState({
    lastName: '',
    firstName: '',
    phone: ''
  });
   
  const onFinish = async (values: Types.IForm.Update) => {
    try {
      setLoading(true);
      const { data } = await Api.Update({ ...values, id: shopId });
      if (inputChecked) {
        const { data: SellerData } = await Api.Seller({ id: shopId, ...sellerData });
      }

      const shop = Mappers.Shop(data);
      message.success(`Shop ${shop.title} Updated successfully`);
      setLoading(false);
      setInputChecked(false);
      onSuccess && onSuccess();
      setSellerData(prev => ({ lastName: '', firstName: '', phone: '' }));
    } catch (err) {
      setLoading(false);
    }
  };

  const slesr = async () => {
    try {
    } catch (e) {}
  };

  React.useEffect(() => {
    Api.Single({ id: shopId }).then(({ data }) => {
      const shop = Mappers.Shop(data);
      form.setFieldsValue(shop);
    });
  }, [shopId, form]);

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputChecked(e.target.checked);
  };

  return (
    <div>
      <h1 className="m-0">Update Page</h1>
      <Form form={form} onFinish={onFinish} className="flex flex-col gap-2">
        <Form.Item<Types.IForm.Update>
          className="m-0"
          name="title"
          rules={[{ required: true, message: 'Please input shop title!' }]}
        >
          <Input size="large" placeholder="Title" />
        </Form.Item>
        <Form.Item<Types.IForm.Update>
          className="m-0"
          name="location"
          rules={[{ required: true, message: 'Please input shop location!' }]}
        >
          <Input size="large" placeholder="Location" />
        </Form.Item>
        <Form.Item<Types.IForm.Update>
          className="m-0"
          name="phone"
          rules={[{ required: true, message: 'Please input shop phone!' }]}
        >
          <Input size="large" placeholder="Phone" />
        </Form.Item>
        <Form.Item<Types.IForm.Update>
          className="m-0"
          name="number"
          rules={[{ required: true, message: 'Please input shop number!' }]}
        >
          <Input size="large" placeholder="Number" />
        </Form.Item>

        <div>
          <input type="checkbox" id="scales" name="scales" checked={inputChecked} onChange={handleCheckbox} />
          <label htmlFor="scales" className="text-[25px]">
            Seller
          </label>
        </div>

        {inputChecked && (
          <div className="flex flex-col gap-3">
            <Input
              value={sellerData.firstName}
              onChange={e => setSellerData({ ...sellerData, firstName: e.target.value })}
              type="text"
              placeholder="First Name"
            />
            <Input
              value={sellerData.lastName}
              onChange={e => setSellerData({ ...sellerData, lastName: e.target.value })}
              type="text"
              placeholder="Last Name"
            />
            <Input
              value={sellerData.phone}
              onChange={e => setSellerData({ ...sellerData, phone: e.target.value })}
              type="text"
              placeholder="Phone"
            />
          </div>
        )}

        <Button loading={loading} size="large" type="primary" htmlType="submit">
          Update Shop
        </Button>
      </Form>
    </div>
  );
};

export default Update;

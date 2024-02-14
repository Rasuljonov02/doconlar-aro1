import { Button, Popconfirm, Table, message } from 'antd';
import { Api } from 'modules/shops';
import { useList } from 'modules/shops/hooks';
import { IEntity } from 'modules/shops/types';

import { FC, useEffect, useState } from 'react';

interface SellerProps {
  onSuccess?: () => void;
  shopId: string;
}

      
      const Seller: FC<SellerProps> = ({onSuccess, shopId = '' }) => {
  const [sellerData, setSellerData] = useState<IEntity.Seller[]>([]);
  const { isLoading, refetch } = useList();

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const { data } = await Api.Single({ id: shopId });
        setSellerData(data.sellers);
      } catch (error) {
        console.error('Error fetching seller data:', error);
        message.error('Failed to fetch seller data.');
      }
    };

    fetchData();
  }, [shopId]);

  const onDelete = async (id: string) => {
    try {
      await Api.Sellerdelet({ shopid: shopId, id });
      refetch();
      onSuccess!();

      message.success('Seller deleted successfully');
    } catch (err) {
      console.error('Error deleting seller:', err);
      message.error('Failed to delete seller.');
    }
  };

  return (
    <div>
      <Table
        loading={isLoading}
        dataSource={sellerData}
        rowKey="_id"
        columns={[
          {
            title: 'firstName',
            dataIndex: 'firstName'
          },
          {
            title: 'lastName',
            dataIndex: 'lastName'
          },
          {
            title: 'phone',
            dataIndex: 'phone'
          },
          {
            title: 'Actions',
            dataIndex: '_id',
            render: (_id: string) => (
              <Button.Group>
                <Popconfirm
                  title="Delete the shop"
                  description="Are you sure to delete this shop?"
                  okText="Yes"
                  onConfirm={() => onDelete(_id)}
                  cancelText="No"
                >
                  <Button danger type="primary">
                    Delete
                  </Button>
                </Popconfirm>
              </Button.Group>
            )
          }
        ]}
      />
    </div>
  );
};

export default Seller;

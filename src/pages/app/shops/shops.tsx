import React, { useState } from 'react';
import { Button, Modal, Popconfirm, Table } from 'antd';
import { useList } from 'modules/shops/hooks';
import { StringParam, useQueryParam } from 'use-query-params';
import Add from './add';
import Update from './update';
import { Api } from 'modules/shops';
import Info from './Info';
import Seller from './Seller';

const Main: React.FC = () => {
  const { isLoading, shops, isFetching, refetch } = useList();
  const [shopId, setShopId] = useQueryParam('shopId', StringParam);
  const [infoId1, setInfoId1] = useState<string | undefined>();
  const [selesddel, selesddelete] = useState<string | undefined>();

  const onSuccess = () => {
    setShopId(undefined);
    setInfoId1(undefined);
    selesddelete(undefined);
    refetch();
  };

  const onDelete = async (id: string) => {
    try {
      await Api.Delete({ id });
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h2>Shops</h2>
        <Button onClick={() => setShopId('new')}>Add</Button>
      </div>
      <Table
        loading={isLoading || isFetching}
        dataSource={shops}
        rowKey="id"
        columns={[
          {
            title: 'Title',
            dataIndex: 'title'
          },
          {
            title: 'Location',
            dataIndex: 'location'
          },
          {
            title: 'Phone',
            dataIndex: 'phone'
          },
          {
            title: 'Shop number',
            dataIndex: 'number'
          },
          {
            title: 'Created At',
            dataIndex: 'createdAt'
          },
          {
            title: 'Actions',
            dataIndex: 'id',
            render: id => (
              <Button.Group>
                <Button type="primary" onClick={() => setInfoId1(id)}>
                  Info
                </Button>
                <Button
                  type="dashed"
                  onClick={() => {
                    selesddelete(id);
                  }}
                >
                  Seller Delete
                </Button>
                <Button onClick={() => setShopId(id)}>Edit</Button>
                <Popconfirm
                  title="Delete the shop"
                  description="Are you sure to delete this shop?"
                  okText="Yes"
                  onConfirm={() => onDelete(id)}
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
      <Modal open={!!shopId} className="p-0" footer={null} closeIcon={false} onCancel={() => setShopId(undefined)}>
        {shopId === 'new' ? <Add onSuccess={onSuccess} /> : <Update onSuccess={onSuccess} shopId={shopId!} />}
      </Modal>

      <Modal open={!!infoId1} className="p-0" footer={null} closeIcon={false} onCancel={() => setInfoId1(undefined)}>
        {infoId1 && <Info onSuccess={onSuccess} shopId={infoId1} />}
      </Modal>

      <Modal
        open={!!selesddel}
        className="p-0"
        footer={null}
        closeIcon={false}
        onCancel={() => selesddelete(undefined)}
      >
        {selesddel && <Seller onSuccess={onSuccess} shopId={selesddel} />}
      </Modal>
    </>
  );
};

export default Main;

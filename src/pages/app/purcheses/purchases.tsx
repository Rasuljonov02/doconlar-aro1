import { Button, Drawer, Modal } from 'antd';
import { Api } from 'modules/shops';
import { useList } from 'modules/shops/hooks';
import { IApi } from 'modules/shops/types';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StringParam, useQueryParam } from 'use-query-params';
import Data from './data';

interface PurchasesProps {}

const Purchases: React.FC<PurchasesProps> = props => {
  const [open, setOpen] = useState(false);
  const [selectedShopId, setSelectedShopId] = useState<string | undefined>();

  const [infoId1, setInfoId1] = useState<string | undefined>();
  const [shopId, setShopId] = useQueryParam('shopId', StringParam);

  const [opdaa, setda] = useState<IApi.Single.Response>();
  const { refetch } = useList();

  const { shops } = useList();
  const navigate = useNavigate();

  const onSuccess = () => {
    setShopId(undefined);
    setInfoId1(undefined);
    setSelectedShopId(undefined);
    refetch();
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    navigate(-1);
  };

  const handleClick = async (id: string) => {
    try {
      console.log('Clicked on shop with id:', id);
      const { data } = await Api.Single({ id });
      setda(data);
      console.log(data);
      onClose();
    } catch (error) {
      console.error('Error fetching shop data:', error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-end gap-2">
        <Button
          type="primary"
          onClick={() => {
            showDrawer();
            setShopId('Purchases');
          }}
        >
          Shops
        </Button>
      </div>
      <Drawer title="Shops" onClose={onClose} open={open}>
        {shops ? (
          shops.map(a => (
            <div className="flex cursor-pointer items-center gap-3" key={a.id} onClick={() => handleClick(a.id)}>
              <h2 onClick={() => setSelectedShopId(a.id)}>{a.title}</h2>
            </div>
          ))
        ) : (
          <p>Data Topilmadi</p>
        )}
      </Drawer>

      {opdaa && (
        <div>
          <div className="flex items-center justify-between gap-5">
            <span>
              <h2>Title docon</h2>
              <h3>{opdaa.title}</h3>
            </span>

            <span>
              <Button
                onClick={() => {
                  setInfoId1(selectedShopId);
                  setShopId(`per${selectedShopId}`);
                }}
              >
                Maxsulot qoshish
              </Button>
            </span>
            <Modal
              open={!!infoId1}
              className="p-0"
              footer={null}
              closeIcon={false}
              onCancel={() => setInfoId1(undefined)}
            >
              {infoId1 && <Data onSuccess={onSuccess} shopId={infoId1} />}
            </Modal>
          </div>
        </div>
      )}
    </>
  );
};

export default Purchases;

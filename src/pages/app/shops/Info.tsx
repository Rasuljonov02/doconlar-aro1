import { Form, Input, message } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { Api, Mappers, Types } from 'modules/shops';
import { IEntity } from 'modules/shops/types';
import React, { useEffect, useState } from 'react';

interface UpdateProps {
  onSuccess?: () => void;
  shopId: string;
}

const Info: React.FC<UpdateProps> = ({ shopId }) => {
  const [sellerData, setSellerData] = useState<IEntity.Seller[]>();
  const [form, ol] = useState<Types.IForm.Update>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await Api.Single({ id: shopId });
        const shop = Mappers.Shop(data);
        setSellerData(data.sellers);
        ol(shop);
      } catch (error) {
        console.error('Error fetching seller data:', error);
        message.error('Failed to fetch seller data.');
      }
    };

    fetchData();
  }, [shopId, form]);

  

  return (
    <div>
      <h1 className="m-0">Info Page</h1>

      <div>
        <div>
          {form && (
            <div>
              <div>
                <span className="flex items-center gap-2">
                  <h3>Title :</h3>
                  <p>{form.title}</p>
                </span>
                <span className="flex items-center gap-2">
                  <h3>Location :</h3>
                  <p>{form.location}</p>
                </span>
                <span className="flex items-center gap-2">
                  <h3>Number :</h3>
                  <p>{form.number}</p>
                </span>
                <span className="flex items-center gap-2">
                  <h3>Phone :</h3>
                  <p>{form.phone}</p>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {sellerData && (
        <div>
          {sellerData.map((seller, id) => {
            return (
              <div key={id}>
                <div className="gap flex flex-col">
                  <div className="flex items-center gap-1">
                    <h2 className="">Seller {id}</h2>
                    
                  </div>
                  <div>
                    <span className="flex items-center gap-2  ">
                      <h3>FirstName :</h3>
                      <p className="tetx-[15px]">{seller.firstName} </p>
                    </span>
                    <span className="flex items-center gap-2  ">
                      <h3>LastName :</h3>
                      <p className="tetx-[15px]">{seller.lastName} </p>
                    </span>
                    <span className="flex items-center gap-2  ">
                      <h3>Phone :</h3>
                      <p className="tetx-[15px]">{seller.phone} </p>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Info;

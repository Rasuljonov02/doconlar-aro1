import React from 'react';
import { IApi, IEntity } from '../types';
import { message } from 'antd';
import { Api, Mappers } from '..';

interface IState {
  isLoading: boolean;
  shop: IEntity.Shop | null;
}

interface IParams extends IApi.Single.Request {}

export const useSingle = (params: IParams) => {
  const [state, setState] = React.useState<IState>({ isLoading: false, shop: null });

  React.useEffect(() => {
    async function load() {
      try {
        const { data } = await Api.Single(params);
        const shop = Mappers.Shop(data);
        setState({ shop, isLoading: false });
      } catch (err) {
        setState({ shop: null, isLoading: false });
        message.error('Failed to load shops');
      }
    }
    load();
  }, []);

  return { ...state };
};

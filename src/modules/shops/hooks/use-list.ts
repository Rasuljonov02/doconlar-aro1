import React from 'react';
import { IEntity } from '../types';
import { message } from 'antd';
import { Api, Mappers } from '..';

interface IState {
  isLoading: boolean;
  shops: IEntity.Shop[];
  isFetching: boolean;
}

export const useList = () => {
  const [state, setState] = React.useState<IState>({
    isLoading: false,
    isFetching: false,
    shops: []
  });

  React.useEffect(() => {
    async function load() {
      try {
        const { data } = await Api.List();
        const shops = (data || []).map(Mappers.Shop);
        setState(prev => ({ ...prev, shops, isLoading: false }));
      } catch (err) {
        setState(prev => ({ ...prev, shops: [], isLoading: false }));
        message.error('Failed to load shops');
      }
    }
    load();
  }, []);

  const refetch = async () => {
    try {
      setState(prev => ({ ...prev, isFetching: true }));
      const { data } = await Api.List();
      const shops = (data || []).map(Mappers.Shop);
      setState(prev => ({ ...prev, shops, isFetching: false }));
    } catch (err) {
      setState(prev => ({ ...prev, isFetching: false }));
      message.error('Failed to load shops');
    }
  };

  return { ...state, refetch };
};

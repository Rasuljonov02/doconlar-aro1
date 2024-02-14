import get from 'lodash/get';
import { IEntity } from './types';

export const Seller = (item?: any): IEntity.Seller => ({
  id: get(item, '_id') || '',
  firstName: get(item, 'firstName') || '',
  lastName: get(item, 'lastName') || '',
  phone: get(item, 'phone') || ''
});

export const Shop = (item?: any): IEntity.Shop => ({
  id: get(item, '_id') || '',
  title: get(item, 'title') || '',
  location: get(item, 'location') || '',
  phone: get(item, 'phone') || '',
  number: get(item, 'number') || '',
  sellers: (get(item, 'sellers') || []).map(Seller),
  createdAt: get(item, 'createdAt') || ''
});

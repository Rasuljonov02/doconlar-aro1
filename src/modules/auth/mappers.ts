import get from 'lodash/get';
import { IEntity } from './types';

export const User = (item?: any): IEntity.User => ({
  id: get(item, '_id') || '',
  firstName: get(item, 'firstName') || '',
  lastName: get(item, 'lastName') || '',
  phone: get(item, 'phone') || ''
});

export function Shop(data: any) {
    throw new Error('Function not implemented.');
}

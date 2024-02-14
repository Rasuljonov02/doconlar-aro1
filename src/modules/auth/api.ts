import { http } from 'services';
import { IApi } from './types';
import { config } from 'config';

export const Login = (data: IApi.Login.Request) => http.post<IApi.Login.Response>('/auth/login', data);
export const Register = (data: IApi.Register.Request) => http.post<IApi.Register.Response>('/auth/register', data);
export const Me = ({ token }: IApi.Me.Request) =>
  http.get<IApi.Me.Response>('/auth/me', { headers: { [config.api.tokenKEY]: token } });

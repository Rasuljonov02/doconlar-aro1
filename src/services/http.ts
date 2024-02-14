import axios, { AxiosError } from 'axios';
import { config } from 'config';
import { session } from './session';
import { message } from 'antd';

const http = axios.create({ baseURL: config.api.baseURL });

http.interceptors.request.use(request => {
  const token = session.get();
  const auth = token ? { [config.api.tokenKEY]: token } : {};

  request.headers = { ...request.headers, ...auth } as any;

  return request;
});

http.interceptors.response.use(
  response => {
    response.data = response.data.data;
    return response;
  },
  (error: AxiosError<{ message: string }>) => {
    message.error(error.response?.data?.message);
    throw error;
  }
);

export default http;

import React from 'react';
import { Button, Form, Input, Tag, message } from 'antd';
import { Api, Mappers, Types } from 'modules/auth';
import { Link } from 'react-router-dom';
import { session } from 'services';

import { AuthContext } from 'modules/auth/context';

const Login: React.FC = () => {
  const { login } = React.useContext(AuthContext);

  const onFinish = async (values: Types.IForm.Login) => {
    try {
      const { data } = await Api.Login(values);
      const { token } = data;
      session.add(token);

      {
        const { data } = await Api.Me({ token });
        const user = Mappers.User(data);
        login(user);
        message.success(`👋🏻 Welcome ${user.firstName}!`);
      }
    } catch (err) {}
  };

  return (
    <div className="grid h-screen place-items-center">
      <div className="container mx-auto flex flex-col items-center">
        <h1>Login Form</h1>
        <Form onFinish={onFinish} className="flex w-[400px] flex-col gap-2">
          <Form.Item<Types.IForm.Login>
            className="m-0"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone!' }]}
          >
            <Input size="large" placeholder="Phone" />
          </Form.Item>
          <Form.Item<Types.IForm.Login>
            className="m-0"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password size="large" placeholder="Password" />
          </Form.Item>
          <Button size="large" type="primary" htmlType="submit">
            Login
          </Button>
          <Link to="/auth/register" className="w-max self-end">
            Go to Register
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;

import React from 'react';
import { Button, Checkbox, Form, Input, message, Spin } from 'antd';
import { LockOutlined, MailOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/index.css';
import { useUserContext } from '../Context/UserContext';

interface LoginResponse {
  token: string;
  refreshToken: string;
  name: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const { setUser } = useUserContext();

  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const decodeJwt = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(atob(base64Url).replace(/\+/g, ' '));
    return JSON.parse(base64);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(prev => !prev);
  };

  const onLogin = async (values: any) => {
    setLoading(true);
    try {
      const response = await axios.post<LoginResponse>('http://localhost:8080/auth/signin', {
        email: values.email,
        password: values.password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);

        const decodedToken = decodeJwt(response.data.token);
        const user = { name: decodedToken.name, role: decodedToken.role };
        localStorage.setItem('user', JSON.stringify(user));

        setUser(user);

        if (decodedToken.role === 'ADMIN') {
          navigate('/dotheanh/home');
        } else {
          navigate('/user');
        }

        message.success('Login successful!');
      } else {
        message.error('Login failed!');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'An error occurred during login!';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onLogin}
    >
      <div className="logo-container">
        <img src='https://github.githubassets.com/favicons/favicon.png' alt="Logo" className="logo-image" />
      </div>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your Email!' }]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type={passwordVisible ? 'text' : 'password'}
          placeholder="Password"
          suffix={
            <Button
              type="text"
              icon={passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              onClick={togglePasswordVisibility}
              style={{height: 10}}
            />
          }
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <a className="login-form-forgot" href="/forgot-password">
          Forgot password
        </a>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
          Sign in
        </Button>
        <div style={{ marginTop: 10 }}>
          Or <a href="/register">register now!</a>
        </div>
      </Form.Item>
      {loading && (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Spin />
        </div>
      )}
    </Form>
  );
};

export default Login;

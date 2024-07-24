import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './css/index.css'

const Login: React.FC = () => {
  
    const navigate = useNavigate();
  
    const onLogin = async () => {
          navigate('/dotheanh');
    }

    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onLogin}
      >
        <div className="logo-container">
          <img src='/src/assets/Logo.jpg' alt="Logo" className="logo-image" />
        </div>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
  
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>
  
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          <div style={{ marginTop: 10 }}>
            Or <a href="">register now!</a>
          </div>
        </Form.Item>
      </Form>
    );
  };

  export default Login;
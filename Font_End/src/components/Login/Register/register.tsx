import React from 'react';
import { Button, Checkbox, Form, Input, message, Spin } from 'antd';
import { LockOutlined, MailOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/index.css';

interface RegisterResponse {
  token: string;
  refreshToken: string;
  name: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = React.useState(false);

  const [form] = Form.useForm();

  const onRegister = async (values: any) => {
    setLoading(true);
    try {
      await axios.post<RegisterResponse>('http://localhost:8080/auth/signup', {
        email: values.email,
        password: values.password,
        role: 'USER'
      });

      navigate('/');

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'An error occurred during registration!';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const validateConfirmPassword = (_: any, value: string) => {
    if (!value || value === form.getFieldValue('password')) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('The two passwords that you entered do not match!'));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(prev => !prev);
  };

  return (
    <Form
      form={form}
      name="normal_register"
      className="register-form"
      initialValues={{ remember: true }}
      onFinish={onRegister}
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
      <Form.Item
        name="confirmPassword"
        rules={[
          { required: true, message: 'Please confirm your Password!' },
          { validator: validateConfirmPassword }
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type={confirmPasswordVisible ? 'text' : 'password'}
          placeholder="Confirm Password"
          suffix={
            <Button
              type="text"
              icon={confirmPasswordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              onClick={toggleConfirmPasswordVisibility}
              style={{height: 10}}
            />
          }
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="register-form-button" loading={loading}>
          Sign up
        </Button>
        <div style={{ marginTop: 10 }}>
          Or <a href="/">login now!</a>
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

export default Register;

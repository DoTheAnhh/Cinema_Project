import React from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import axios from 'axios';
import './css/index.css'
import { LOCALHOST } from '../../APIs/typing';

const ForgotPassword: React.FC = () => {
    const [loading, setLoading] = React.useState(false);

    const onFinish = async (values: { email: string }) => {
        setLoading(true);
        try {
            const response = await axios.post(LOCALHOST + '/auth/forgot-password', { email: values.email });

            if (response.data.statusCode === 200) {
                message.success('Email đặt lại mật khẩu đã được gửi.');
            } else {
                message.error(response.data.message || 'Email không chính xác');
            }
            localStorage.setItem('token', response.data.token)
        } catch (error) {
            message.error('Có lỗi xảy ra.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            name="forgot_password"
            className="forgot-password-form"
            onFinish={onFinish}
        >
            <div className="logo-container">
                <img src='/src/assets/Logo.jpg' alt="Logo" className="logo-image" />
            </div>
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your Email!' }]}
            >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="forgot-password-form-button" loading={loading}>
                    Forgot password
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

export default ForgotPassword;

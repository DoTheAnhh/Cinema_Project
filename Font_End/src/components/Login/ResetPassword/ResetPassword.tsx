import React, { useEffect } from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import './css/index.css';
import axios from 'axios';
import { LOCALHOST } from '../../APIs/typing';

const ResetPassword: React.FC = () => {
    const [loading, setLoading] = React.useState(false);
    const [token, setToken] = React.useState<string | null>(null);

    useEffect(() => {
        const tokenn = localStorage.getItem('token')
        setToken(tokenn);
    }, []);

    const onFinish = async (values: { password: string }) => {
        if (!token) {
            console.log(token);
            message.error('Token không hợp lệ.');
            return;
        }

        setLoading(true);
        
        
        try {
            const response = await axios.post(LOCALHOST + '/auth/reset-password', { password: values.password }, {
                params: { token }
            });

            if (response.data.statusCode === 200) {
                message.success('Đặt lại mật khẩu thành công.');
                window.location.href = '/';
            } else {
                message.error(response.data.message || 'Có lỗi xảy ra.');
            }
        } catch (error) {
            message.error('Có lỗi xảy ra.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            name="reset_password"
            className="reset-password-form"
            onFinish={onFinish}
        >
            <div className="logo-container">
                <img src='/src/assets/Logo.jpg' alt="Logo" className="logo-image" />
            </div>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your new password!' }]}
            >
                <Input.Password placeholder="New Password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="reset-password-form-button" loading={loading}>
                    Reset Password
                </Button>
            </Form.Item>
            {loading && (
                <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <Spin />
                </div>
            )}
        </Form>
    );
};

export default ResetPassword;

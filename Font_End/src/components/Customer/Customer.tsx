import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API, LOCALHOST, REQUEST_MAPPING } from '../APIs/typing';
import { Customerr } from '../Types';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, message, Popconfirm, Radio, Select, TimePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { Option } from 'antd/es/mentions';

const Customer: React.FC = () => {

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState<boolean>(true);
    const [location, setLocation] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const [customers, setCustomers] = useState<Customerr[]>([])

    const customer = { name, age, birthday, gender, location, username, password }

    const { id } = useParams()
    const navigator = useNavigate();

    const fetchCustomer = async (id: number) => {
        try {
            const res = await axios.get(LOCALHOST + REQUEST_MAPPING.CUSTOMER + API.CUSTOMER.GETALL_CUSTOMER + `/${id}`);
            const customerData = res.data
            setName(customerData.name)
            setAge(customerData.age)
            setBirthday(customerData.birthday)
            setGender(customerData.gender)
            setLocation(customerData.location)
            setUsername(customerData.username)
            setPassword(customerData.password)
            setRole(customerData.role)
        } catch (err) {
            console.error(err);
        }
    }

    const validateForm = (): boolean => {
        if (!name.trim()) {
            message.error("Name is required")
            return false;
        }
        if (age < 0) {
            message.error("Age is required")
        }
        if (!birthday.trim()) {
            message.error("Birthday is required")
            return false;
        }
        if (!gender) {
            message.error("Gender is required")
            return false;
        }
        if (!location.trim()) {
            message.error("Location is required")
            return false;
        }
        if (!username.trim()) {
            message.error("Username is required")
            return false;
        }
        if (!password.trim()) {
            message.error("Password is required")
            return false;
        }
        if (!role.trim()) {
            message.error("Role is required")
            return false;
        }
        return true;
    }

    const handleInsertOrUpdateCustomer = async () => {
        if (!validateForm()) {
            return;
        }
        try {
            const data = {
                ...customer,
            };
            if (id) {
                await axios.put(LOCALHOST + REQUEST_MAPPING.CUSTOMER + API.CUSTOMER.EDIT_CUSTOMER + `/${id}`, data);
            } else {
                await axios.post(LOCALHOST + REQUEST_MAPPING.CUSTOMER + API.CUSTOMER.INSERT_CUSTOMER, data);
            }
            backToList();
        } catch (e) {
            console.error('Error adding item: ', e);
        }
    };

    const backToList = () => {
        navigator("/dotheanh/customers");
    };

    useEffect(() => {
        if (id) {
            fetchCustomer(Number(id));
        }
    }, [id])

    useEffect(() => {
        const birthYear = dayjs(birthday).year();
        const currentYear = dayjs().year();
        setAge(currentYear - birthYear);
    }, [birthday]);

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '600px' }}>
                <Form layout="vertical">
                    <Form.Item label="Name" required>
                        <Input
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Birthday" required>
                        <Input
                            type='date'
                            placeholder="Birthday"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Age" required>
                        <Input
                            placeholder="Age"
                            value={age} disabled
                        />
                    </Form.Item>
                    <Form.Item label="Gender" required>
                        <Radio.Group onChange={(e) => setGender(e.target.value)} value={gender}>
                            <Radio value={true}>Male</Radio>
                            <Radio value={false}>Female</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Location" required>
                        <Input
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Username" required>
                        <Input
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Password" required>
                        <Input
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Role" required>
                        <Select
                            placeholder="Select a role"
                            value={role}
                            onChange={(value) => setRole(value)}
                        >
                            <Option value="ADMIN">ADMIN</Option>
                            <Option value="USER">USER</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Popconfirm
                            title="Are you sure to submit this customer?"
                            onConfirm={() => handleInsertOrUpdateCustomer()}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="primary">Submit</Button>
                        </Popconfirm>
                        <Popconfirm
                            title="Are you sure back to list?"
                            className="ms-2"
                            onConfirm={backToList}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="default" style={{ marginLeft: 20 }}>Back to list</Button>
                        </Popconfirm>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Customer
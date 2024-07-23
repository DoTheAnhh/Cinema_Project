import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API, LOCALHOST, REQUEST_MAPPING } from '../APIs/typing'
import { Button, Form, Input, message, Popconfirm } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'

const Theater: React.FC = () => {

    const [theaterName, setTheaterName] = useState<string>("")
    const [province, setProvince] = useState<string>("")
    const [location, setLocation] = useState<string>("")

    const navigator = useNavigate();
    const { id } = useParams()

    const theater = { theaterName, province, location }

    const fetchTheater = async (id: number) => {
        try {
            const res = await axios.get(LOCALHOST + REQUEST_MAPPING.THEATER + API.THEATER.GETALL_THEATER + `/${id}`)
            const theaterData = res.data
            setTheaterName(theaterData.theaterName)
            setLocation(theaterData.location)
            setProvince(theaterData.province)
            console.log(res.data);
        } catch (err) {
            console.error('Error fetching movie: ', err);
        }
    }

    const validateForm = (): boolean => {
        if (!theaterName.trim()) {
            message.error("Theater name is required")
            return false;
        }
        if (!province.trim()) {
            message.error("Province is required")
            return false;
        }
        if (!location.trim()) {
            message.error("Location is required")
            return false;
        }
        return true;
    }

    const handleInsertOrUpdateTheater = async () => {
        if (!validateForm()) {
            return;
        }
        try {
            const data = {
                ...theater,
            };
            if (id) {
                await axios.put(LOCALHOST + REQUEST_MAPPING.THEATER + API.THEATER.EDIT_THEATER + `/${id}`, data);
            } else {
                await axios.post(LOCALHOST + REQUEST_MAPPING.THEATER + API.THEATER.INSERT_THEATER, data);
            }
            backToList();
        } catch (e) {
            console.error('Error adding item: ', e);
        }
    };

    const backToList = () => {
        navigator("/dotheanh/theaters");
    };

    useEffect(() => {
        if(id){
            fetchTheater(Number(id))
        }
    }, [id])

    return (
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
            <div className="container mt-5" style={{ width: '1000px', display: 'flex', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                    <Form layout="vertical">
                        <Form.Item label="Theater name" required>
                            <Input value={theaterName} onChange={(e) => setTheaterName(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Province" required>
                            <Input value={province} onChange={(e) => setProvince(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Location" required>
                            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
                        </Form.Item>
                        <Form.Item>
                            <Popconfirm
                                title="Are you sure to submit this movie?"
                                onConfirm={() => handleInsertOrUpdateTheater()}
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
                                cancelText="No">
                                <Button type="default" style={{ marginLeft: 20 }}>Back to list</Button>
                            </Popconfirm>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Theater
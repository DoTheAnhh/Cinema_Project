import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row, Table, Tooltip } from 'antd';
import { EditFilled } from "@ant-design/icons";
import { API, LOCALHOST, REQUEST_MAPPING } from '../APIs/typing';
import { Theaterr } from '../Types';
import { Link, useNavigate } from 'react-router-dom';
import ListCinemaRoom from '../MovieCinema/ListCinemaRoom';

const ListTheater: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [theaters, setTheaters] = useState<Theaterr[]>([]);

    const navigator = useNavigate();

    const fetchTheater = async () => {
        try {
            const res = await axios.get(LOCALHOST + REQUEST_MAPPING.THEATER + API.THEATER.GETALL_THEATER);
            setTheaters(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    const editTheater = (id: number) => {
        navigator(`/dotheanh/theaters/theater/${id}`);
    };

    const showModal = (id: number) => {
        setSelectedId(id);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'Theater name',
            dataIndex: 'theaterName',
            key: 'theaterName',
            align: "center" as const,
        },
        {
            title: 'Province',
            dataIndex: 'province',
            key: 'province',
            align: "center" as const,
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            align: "center" as const,
        },
        {
            title: "Action",
            key: "action",
            align: "center" as const,
            render: (record: Theaterr) => (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Tooltip title="Edit">
                        <Button
                            type="primary"
                            style={{ marginLeft: 10 }}
                            onClick={() => editTheater(record.id)}
                            icon={<EditFilled />}
                        />
                    </Tooltip>
                    <Tooltip title="Cinema room">
                        <Button
                            type="primary"
                            style={{ marginLeft: 10 }}
                            onClick={() => showModal(record.id)}
                        >
                            Cinema room
                        </Button>
                    </Tooltip>
                    <Modal
                        title="Cinema room"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        okText="New room"
                    >
                        {selectedId && <ListCinemaRoom id={selectedId} />}
                    </Modal>
                </div>
            ),
        }
    ];

    useEffect(() => {
        fetchTheater();
    }, []);

    return (
        <>
            <div className="container mt-3">
                <Row gutter={[16, 16]} align="middle" style={{ marginBottom: 20, float: "right" }}>
                    <Col xs={24} md={12} lg={3} style={{ marginLeft: 500 }}>
                        <Button type="primary" style={{ marginLeft: 10 }}>
                            <Link to="/dotheanh/theaters/theater">New theater</Link>
                        </Button>
                    </Col>
                </Row>
            </div>
            <Table
                className="table table-striped mt-3"
                columns={columns}
                dataSource={theaters}
                rowKey="id"
                pagination={false}
                bordered
            />
        </>
    );
}

export default ListTheater;

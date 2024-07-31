import React, { useEffect, useState } from 'react'
import { Actorr } from '../Types';
import axios from 'axios';
import { API, LOCALHOST, REQUEST_MAPPING } from '../APIs/typing';
import { Button, Col, Modal, Row, Table, Tooltip } from 'antd';
import { EditFilled } from '@ant-design/icons';
import Actor from './Actor';


const ListActor: React.FC = () => {

    const [actors, setActors] = useState()
    const [isModalOpenActor, setIsModalOpenActor] = useState(false);
    const [selectedActor, setSelectedActor] = useState<Actorr | null>(null);

    const fetchActor = async () => {
        try {
            const res = await axios.get(LOCALHOST + REQUEST_MAPPING.ACTOR + API.ACTOR.GETALL_ACTOR)
            setActors(res.data)
        } catch (err) {
            console.error(err);
        }
    }

    const showModalActor = (actor: Actorr | null) => {
        setSelectedActor(actor);
        setIsModalOpenActor(true);
    };

    const handleCancelActor = () => {
        setIsModalOpenActor(false);
        setSelectedActor(null);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'actorName',
            key: 'actorName',
            align: 'center' as const,
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center' as const,
            render: (record: Actorr) => (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Tooltip title="Edit">
                        <Button
                            type="primary"
                            style={{ marginLeft: 10 }}
                            onClick={() => showModalActor(record)}
                            icon={<EditFilled />}
                        />
                    </Tooltip>
                </div>
            ),
        },
    ];

    useEffect(() => {
        fetchActor()
    }, [])

    return (
        <>
            <Row>
                <Col>
                    <Button type="primary" style={{ marginBottom: 10, marginLeft: 340 }} onClick={() => showModalActor(null)}>
                        New movie type
                    </Button>
                    <Modal
                        title="Movie type"
                        open={isModalOpenActor}
                        onCancel={handleCancelActor}
                        footer={null}
                    >
                        <Actor actor={selectedActor} onClose={handleCancelActor} onSuccess={fetchActor} />
                    </Modal>
                </Col>
            </Row>
            <Table
                className="table table-striped mt-3"
                columns={columns}
                dataSource={actors}
                rowKey="id"
                pagination={false}
                bordered
            />
        </>
    )
}

export default ListActor
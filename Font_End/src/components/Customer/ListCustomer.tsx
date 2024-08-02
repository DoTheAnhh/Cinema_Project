import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API, LOCALHOST, REQUEST_MAPPING } from '../APIs/typing'
import { Button, Col, Pagination, Row, Table, Tooltip } from 'antd'
import { EditFilled } from "@ant-design/icons";
import { Customerr } from '../Types'
import dayjs from 'dayjs'
import { Link, useNavigate } from 'react-router-dom';

const ListCustomer: React.FC = () => {

    const [customers, setCustomers] = useState<Customerr[]>([])

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(5);
    const [totalCustomer, setTotalCustomer] = useState<number>(0);

    const navigator = useNavigate()

    const fetchCustomer = async (page: number, size: number) => {
        try {
            const res = await axios.get(LOCALHOST + REQUEST_MAPPING.CUSTOMER + API.CUSTOMER.GETALL_CUSTOMER, {
                params: {
                    page: page - 1,
                    size: size,
                },
            })
            setCustomers(res.data.totalElements)
            return res.data.content;
        } catch (err) {
            console.error(err);
        }
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchCustomer(page, pageSize);
    };

    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        setCurrentPage(0);
        fetchCustomer(0, size);
    };

    const editCustomer = (id: number) => {
        navigator(`/dotheanh/customers/customer/${id}`);
    };

    useEffect(() => {
        fetchCustomer(currentPage, pageSize).then((data) => {
            setCustomers(data);
        });
    }, [currentPage, pageSize]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center' as const,
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            align: 'center' as const,
            sorter: (a: any, b: any) => a.age - b.age,
        },
        {
            title: 'Birthday',
            dataIndex: 'birthday',
            key: 'birthday',
            align: 'center' as const,
            render: (birthday: string) => dayjs(birthday).format('DD/MM/YYYY'),
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            align: 'center' as const,
            render: (gender: boolean) => (gender ? 'Male' : 'Female'),
            sorter: (a: any, b: any) => (a.gender === b.gender ? 0 : a.gender ? -1 : 1),
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            align: 'center' as const,
            sorter: (a: any, b: any) => a.location.localeCompare(b.location),
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            align: 'center' as const,
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
            align: 'center' as const,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            align: 'center' as const,
            sorter: (a: any, b: any) => a.role.localeCompare(b.role),
        },
        {
            title: "Action",
            key: "action",
            align: "center" as const,
            render: (record: Customerr) => (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Tooltip title="Edit">
                        <Button
                            type="primary"
                            style={{ marginLeft: 10 }}
                            onClick={() => editCustomer(record.id)}
                            icon={<EditFilled />}
                        />
                    </Tooltip>
                </div>
            ),
        }
    ]

    return (
        <>
            <Row>
                <Col xs={24} md={12} lg={3} style={{ marginLeft: 1080, }}>
                    <Button type="primary" style={{ marginLeft: 10, marginBottom: 20 }}>
                        <Link to="/dotheanh/customers/customer">New customer</Link>
                    </Button>
                </Col>
            </Row>
            <Table
                className="table table-striped mt-3"
                columns={columns}
                dataSource={customers}
                rowKey="id"
                pagination={false}
                bordered
            />
            <Pagination
                style={{ marginTop: 50, justifyContent: 'center' }}
                className="pagination-container"
                current={currentPage}
                pageSize={pageSize}
                total={totalCustomer}
                onChange={handlePageChange}
                onShowSizeChange={handlePageSizeChange}
            />
        </>


    )
}

export default ListCustomer
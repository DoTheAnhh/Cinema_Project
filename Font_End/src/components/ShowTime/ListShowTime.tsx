import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API, LOCALHOST, REQUEST_MAPPING } from '../APIs/typing'
import { ShowTimee } from '../Types'
import { Button, Col, Pagination, Row, Table, Tooltip } from 'antd'
import { EditFilled } from "@ant-design/icons";
import dayjs from 'dayjs'
import { ColumnsType } from 'antd/es/table'
import { Link, useNavigate } from 'react-router-dom'

const ListShowTime: React.FC = () => {

    const [showTimes, setShowTimes] = useState<ShowTimee[]>([])

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(7);
    const [totalShowTime, setTotalShowTime] = useState<number>(0);

    const navigator = useNavigate()

    const fetchShowTimes = async (page: number, size: number) => {
        try {
            const res = await axios.get(LOCALHOST + REQUEST_MAPPING.SHOW_TIME + API.SHOW_TIME.GETALL_SHOW_TIME, {
                params: {
                    page: page - 1,
                    size: size,
                },
            })
            setTotalShowTime(res.data.totalElements);
            return res.data.content;
        } catch (err) {
            console.error(err);
        }
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchShowTimes(page, pageSize);
    };

    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        setCurrentPage(0);
        fetchShowTimes(0, size);
    };

    const editCinemaRoom = (id: number) => {
        navigator(`/dotheanh/show-times/show-time/${id}`);
      };

    useEffect(() => {
        fetchShowTimes(currentPage, pageSize).then((data) => {
            setShowTimes(data);
        });
    }, [currentPage, pageSize]);

    const columns: ColumnsType<ShowTimee> = [
        {
            title: 'Theater',
            dataIndex: ['theater', 'theaterName'],
            key: 'theaterName',
            align: "center" as const,
            sorter: (a: ShowTimee, b: ShowTimee) => a.theater.theaterName.localeCompare(b.theater.theaterName),
        },
        {
            title: 'Movie',
            dataIndex: ['movie', 'movieName'],
            key: 'movieName',
            align: "center" as const,
            sorter: (a: ShowTimee, b: ShowTimee) => a.movie.movieName.localeCompare(b.movie.movieName),
        },
        {
            title: 'Show date',
            dataIndex: 'showDate',
            key: 'showDate',
            align: 'center',
            sorter: (a: ShowTimee, b: ShowTimee) => {
                return dayjs(a.showDate).unix() - dayjs(b.showDate).unix();
            },
            render: (text: Date) => dayjs(text).format('DD/MM/YYYY'),
        },
        {
            title: 'Show time',
            dataIndex: 'showTime',
            key: 'showTime',
            align: "center" as const,
        },
        {
            title: "Action",
            key: "action",
            align: "center" as const,
            render: (record: ShowTimee) => (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Tooltip title="Show time">
                        <Button
                            type="primary"
                            style={{ marginLeft: 10 }}
                            onClick={() => editCinemaRoom(record.id)}
                            icon={<EditFilled />}
                        >
                        </Button>
                    </Tooltip>
                </div>
            )
        }
    ]

    return (
        <>
            <Row style={{ float: 'right' }}>
                <Col xs={24} md={12} lg={3} style={{ marginLeft: 500, marginBottom: 20 }}>
                    <Button type="primary" style={{ marginLeft: 10 }}>
                        <Link to="/dotheanh/show-times/show-time">New show time</Link>
                    </Button>
                </Col>
            </Row>
            <Table
                className="table table-striped mt-3"
                columns={columns}
                dataSource={showTimes}
                rowKey="id"
                pagination={false}
                bordered
            />
            <Pagination
                style={{ marginTop: 50, justifyContent: 'center' }}
                className="pagination-container"
                current={currentPage}
                pageSize={pageSize}
                total={totalShowTime}
                onChange={handlePageChange}
                onShowSizeChange={handlePageSizeChange}
            />
        </>
    )
}

export default ListShowTime
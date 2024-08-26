import React, { useEffect, useState } from 'react'
import { seatCinemaRoomm } from '../Types';
import { API, LOCALHOST, REQUEST_MAPPING } from '../APIs/typing';
import axios from 'axios';
import { EditFilled } from "@ant-design/icons"
import { Button, Pagination, Table, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';

const ListSeatCinemaRoom: React.FC = () => {

    const [seatCinemaRooms, setSeatCinemaRooms] = useState<seatCinemaRoomm[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    const navigator = useNavigate()

    const fetchSeatCinemaRooms = async (page: number, size: number) => {
        try {
            const res = await axios.get(`${LOCALHOST + REQUEST_MAPPING.SEAT_CINEMA_ROOM + API.SEAT_CINEMA_ROOM.GETALL_SEAT_CINEMA_ROOM}?page=${page}&size=${size}`);
            setSeatCinemaRooms(res.data.content)
            setTotal(res.data.totalElements);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchSeatCinemaRooms(currentPage - 1, pageSize);
    }, [currentPage, pageSize]);

    const handlePageChange = (page: number, pageSize: number) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const editSeatCinemaRoom = (id: number) => {
        navigator(`/dotheanh/seat-cinema-rooms/seat-cinema-room/${id}`);
      };

    const columns = [
        {
            title: 'Row number',
            dataIndex: 'rowNumber',
            key: 'rowNumber',
            align: "center" as const,
            sorter: (a: seatCinemaRoomm, b: seatCinemaRoomm) => a.rowNumber.localeCompare(b.rowNumber),
        },
        {
            title: 'Seat number',
            dataIndex: 'seatNumber',
            key: 'seatNumber',
            align: "center" as const,
            sorter: (a: seatCinemaRoomm, b: seatCinemaRoomm) => String(a.seatNumber).localeCompare(String(b.seatNumber)),
        },
        {
            title: 'Seat type',
            dataIndex: 'seatType',
            key: 'seatType',
            align: "center" as const,
            sorter: (a: seatCinemaRoomm, b: seatCinemaRoomm) => a.seatType.localeCompare(b.seatType),
        },
        {
            title: 'Cinema room name',
            dataIndex: 'cinemaRoomName',
            key: 'cinemaRoomName',
            align: "center" as const,
            sorter: (a: seatCinemaRoomm, b: seatCinemaRoomm) => String(a.cinemaRoomName).localeCompare(String(b.cinemaRoomName)),
        },
        {
            title: 'Theater name',
            dataIndex: ['theaters', 'theaterName'],
            key: 'theaterName',
            align: "center" as const,
            sorter: (a: seatCinemaRoomm, b: seatCinemaRoomm) => a.theaters.theaterName.localeCompare(b.theaters.theaterName),
        },
        {
            title: 'Location theater',
            dataIndex: ['theaters', 'location'],
            key: 'location',
            align: "center" as const,
        },
        {
            title: 'Status seat',
            dataIndex: 'status',
            key: 'status',
            align: "center" as const,
            sorter: (a: seatCinemaRoomm, b: seatCinemaRoomm) => a.status.localeCompare(b.status),
        },
        {
            title: "Action",
            key: "action",
            align: "center" as const,
            render: (record: seatCinemaRoomm) => (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Tooltip title="Cinema room">
                        <Button
                            type="primary"
                            style={{ marginLeft: 10 }}
                            onClick={() => editSeatCinemaRoom(record.id)}
                            icon={<EditFilled />}
                        >
                        </Button>
                    </Tooltip>
                </div>
            ),
        }
    ];

    return (
        <>
            <Table
                className="table table-striped mt-3"
                columns={columns}
                dataSource={seatCinemaRooms}
                rowKey="id"
                pagination={false}
                bordered
            />
            <Pagination
                style={{ marginTop: 20, float: 'right' }}
                current={currentPage}
                pageSize={pageSize}
                total={total}
                onChange={handlePageChange}
                showSizeChanger
                pageSizeOptions={[10, 20, 50, 75, 100, total]}
                showTotal={(total) => `Total ${total} items`}
            />
        </>
    )
}

export default ListSeatCinemaRoom
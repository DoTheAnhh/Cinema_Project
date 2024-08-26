import React, { useEffect, useState } from 'react'
import { seatCinemaRoomm } from '../Types';
import { API, LOCALHOST, REQUEST_MAPPING } from '../APIs/typing';
import axios from 'axios';
import { EditFilled } from "@ant-design/icons"
import { Button, Table, Tooltip } from 'antd';

const ListSeatCinemaRoom: React.FC = () => {

    const [seatCinemaRooms, setSeatCinemaRooms] = useState<seatCinemaRoomm[]>([]);

    const fetchSeatCinemaRooms = async () => {
        try {
            const res = await axios.get(LOCALHOST + REQUEST_MAPPING.SEAT_CINEMA_ROOM + API.SEAT_CINEMA_ROOM.GETALL_SEAT_CINEMA_ROOM)
            setSeatCinemaRooms(res.data);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchSeatCinemaRooms()
    })

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
                            //onClick={() => editCinemaRoom(record.id)}
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
        </>
    )
}

export default ListSeatCinemaRoom
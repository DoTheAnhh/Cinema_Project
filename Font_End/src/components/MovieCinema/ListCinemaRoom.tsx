
import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table, Tooltip } from 'antd';
import { EditFilled } from "@ant-design/icons";
import { CinamaRoomm } from '../Types';
import { API, LOCALHOST, REQUEST_MAPPING } from '../APIs/typing';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ListCinemaRoom: React.FC = () => {

  const [cinemaRooms, setCinemaRooms] = useState<CinamaRoomm[]>([]);

  const navigator = useNavigate()

  const fetchCinemaRoom = async () => {
    const res = await axios.get(LOCALHOST + REQUEST_MAPPING.CINEMA_ROOM + API.CINEMA_ROOM.GETALL_CINEMA_ROOM)
    setCinemaRooms(res.data);
  }

  const editMovie = (id: number) => {
    navigator(`/dotheanh/cinema-rooms/cinema-room/${id}`);
  };

  useEffect(() => {
    fetchCinemaRoom();
  }, [])

  const columns = [
    {
      title: 'Theater',
      dataIndex: ['theaters', 'theaterName'],
      key: 'theaterName',
      align: "center" as const,
    },
    {
      title: 'Cinema room name',
      dataIndex: 'cinemaRoomName',
      key: 'cinemaRoomName',
      align: "center" as const,
    },
    {
      title: "Action",
      key: "action",
      align: "center" as const,
      render: (record: CinamaRoomm) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Tooltip title="Cinema room">
            <Button
              type="primary"
              style={{ marginLeft: 10 }}
              onClick={() => editMovie(record.id)}
              icon={<EditFilled />}
            >
            </Button>
          </Tooltip>
        </div>
      ),
    }
  ];

  return (
    <div>
      <Row style={{ float: 'right' }}>
        <Col xs={24} md={12} lg={3} style={{ marginLeft: 500 }}>
          <Button type="primary" style={{ marginLeft: 10 }}>
            <Link to="/dotheanh/cinema-rooms/cinema-room">New movie</Link>
          </Button>
        </Col>
      </Row>
      <Table
        className="table table-striped mt-3"
        columns={columns}
        dataSource={cinemaRooms}
        rowKey="id"
        pagination={false}
        bordered
      />
    </div>
  );
}

export default ListCinemaRoom;

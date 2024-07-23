import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API, LOCALHOST, REQUEST_MAPPING } from '../APIs/typing'
import { Button, Table, Tooltip } from 'antd'
import { EditFilled } from "@ant-design/icons";
import { CinamaRoomm } from '../Types';

const ListCinemaRoom: React.FC<{ id: number }> = ({ id }) => {

  const [cinemaRooms, setCinemaRooms] = useState()

  const fetchCinemaRoomByTheaterId = async (id: number) => {
    try {
      const res = await axios.get(LOCALHOST + REQUEST_MAPPING.CINEMA_ROOM + API.CINEMA_ROOM.GETALL_CINEMA_ROOM + '/theater' + `/${id}`)
      setCinemaRooms(res.data)
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  const columns = [
    {
      title: 'Theater',
      dataIndex: ['theaters', 'theaterName'],
      key: 'cinemaRoom',
      align: "center" as const,
    },
    {
      title: 'Cinema room',
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
              <Tooltip title="Edit">
                  <Button
                      type="primary"
                      style={{ marginLeft: 10 }}
                      //onClick={() => editTheater(record.id)}
                      icon={<EditFilled />}
                  />
              </Tooltip>
          </div>
      ),
  }
  ]

  useEffect(() => {
    fetchCinemaRoomByTheaterId(id)
  }, [id])

  return (
    <div>
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

export default ListCinemaRoom
import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { API, LOCALHOST, REQUEST_MAPPING } from '../APIs/typing'
import { Button, Form, Input, message, Popconfirm, Select } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { Theaterr } from '../Types'

const CinemaRoom: React.FC = () => {
  const [cinemaRoomName, setCinemaRoomName] = useState<string>("")
  const [theater, setTheater] = useState<number>()

  const [theaters, setTheaters] = useState<Theaterr[]>([]);

  const navigator = useNavigate();

  const { id } = useParams()

  const fetchCinemaRoom = async (id: number) => {
    try {
      const res = await axios.get(LOCALHOST + REQUEST_MAPPING.CINEMA_ROOM + API.CINEMA_ROOM.GETALL_CINEMA_ROOM + `/${id}`)
      const cinemaRoomData = res.data
      setCinemaRoomName(cinemaRoomData.cinemaRoomName)
      setTheater(cinemaRoomData.theaters.theaterName)
    } catch (err) {
      console.error('Error fetching cinema room: ', err);
    }
  }

  const fetchTheater = async () => {
    const res = await axios.get(LOCALHOST + REQUEST_MAPPING.THEATER + API.THEATER.GETALL_THEATER)
    setTheaters(res.data)
  }

  const decodeJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Invalid token");
      return null;
    }
  };

  const handleInsertOrUpdateCinemaRoom = async () => {
    if (!cinemaRoomName.trim()) {
      message.error("Cinema room name is required")
      return
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const decodedToken = decodeJwt(token);
      if (!decodedToken) {
        console.error('Invalid token');
        return;
      }

      const userRole = decodedToken.role;

      if (userRole !== 'ADMIN') {
        console.error('User does not have the required ADMIN role');
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const data = {
        theater: {
          id: theater
        },
        cinemaRoomName: cinemaRoomName
      };
      if (id) {
        await axios.put(LOCALHOST + REQUEST_MAPPING.CINEMA_ROOM + API.CINEMA_ROOM.EDIT_CINEMA_ROOM + `/${id}`, data, config);
      } else {
        await axios.post(LOCALHOST + REQUEST_MAPPING.CINEMA_ROOM + API.CINEMA_ROOM.INSERT_CINEMA_ROOM, data, config);
      }
      backToList();
    } catch (e) {
      console.error('Error adding item: ', e);
    }
  };

  const backToList = () => {
    navigator("/dotheanh/cinema-rooms");
  };

  const handleTheaterChange = (value: string) => {
    const selectTheater = theaters.find(theater => theater.id.toString() === value);
    if (selectTheater) {
      setTheater(selectTheater.id);
    }
  };

  const optionsTheater = useMemo(() => theaters.map((tt) => ({
    value: tt.id.toString(),
    label: tt.theaterName,
  })), [theaters]);

  useEffect(() => {
    fetchTheater()
    if (id) {
      fetchCinemaRoom(Number(id))
    }
  }, [id])

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '600px' }}>
        <Form layout="vertical">
          <Form.Item label="Theater name" required>
            <Select
              placeholder="Theater name"
              style={{ width: '100%', maxHeight: '300px', overflow: 'auto' }}
              value={theater?.toString()}
              options={optionsTheater}
              onChange={handleTheaterChange}
            />
          </Form.Item>
          <Form.Item label="Cinema room name" required>
            <Input placeholder="Cinema room name" value={cinemaRoomName} onChange={(e) => setCinemaRoomName(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Popconfirm
              title="Are you sure to submit this cinema room?"
              onConfirm={() => handleInsertOrUpdateCinemaRoom()}
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

export default CinemaRoom

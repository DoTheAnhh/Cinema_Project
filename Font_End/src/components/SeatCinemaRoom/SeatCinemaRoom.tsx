import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API, LOCALHOST, REQUEST_MAPPING } from '../APIs/typing';
import { Button, Form, Input, message, Popconfirm, Select } from 'antd';
import { CinemaRoomm, Seatt } from '../Types';

const SeatCinemaRoom: React.FC = () => {

  const [seat, setSeat] = useState<number[]>([]);
  const [status, setStatus] = useState<string>('');

  const [cinemaRoomId, setCinemaRoomId] = useState<number | null>(null);
  const [cinemaRoomName, setCinemaRoomName] = useState<string>('');


  const [seats, setSeats] = useState<Seatt[]>([]);
  const [cinemaRooms, setCinemaRooms] = useState<CinemaRoomm[]>([]);

  const { id } = useParams();

  const navigator = useNavigate();

  const seatCinemaRoom = { status }

  const fetchSeatCinemaRoomById = async (id: number) => {
    try {
      const res = await axios.get(LOCALHOST + REQUEST_MAPPING.SEAT_CINEMA_ROOM + API.SEAT_CINEMA_ROOM.GETALL_SEAT_CINEMA_ROOM + `/${id}`);
      const seatCinemaRoomData = res.data;

      setStatus(seatCinemaRoomData.status);

      if (seatCinemaRoomData.cinemaRoomId && seatCinemaRoomData.cinemaRoomName) {
        setCinemaRoomId(seatCinemaRoomData.cinemaRoomId);
        setCinemaRoomName(seatCinemaRoomData.cinemaRoomName);
      } else {
        setCinemaRoomId(null);
        setCinemaRoomName('');
      }

      if (Array.isArray(seatCinemaRoomData.seats)) {
        const mappedSeat = seatCinemaRoomData.seats.map((seatId: number) => seatId.toString());
        setSeat(mappedSeat);
      } else {
        setSeat([]);
      }
    }
    catch (err) {
      console.error('Error fetching: ', err);
    }
  }

  const fetchSeat = async () => {
    try {
      const res = await axios.get(LOCALHOST + REQUEST_MAPPING.SEAT + API.SEAT.GET_ALL_SEAT)
      setSeats(res.data);
    } catch (err) {
      console.error('Error fetching: ', err);
    }
  }

  const fetchCinemaRoom = async () => {
    try {
      const res = await axios.get(LOCALHOST + REQUEST_MAPPING.CINEMA_ROOM + API.CINEMA_ROOM.GETALL_CINEMA_ROOM)
      setCinemaRooms(res.data);
    } catch (err) {
      console.error('Error fetching: ', err);
    }
  }

  const validateForm = (): boolean => {
    if (!seat.length) {
      message.error("Seat is required")
      return false;
    }
    return true;
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

  const handleInsertOrUpdateSeatCinemaRoom = async () => {
    if (!validateForm()) {
      return;
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
        ...seatCinemaRoom,
        seats: seat,
        cinemaRoom: cinemaRoomId
      };
      if (id) {
        await axios.put(LOCALHOST + REQUEST_MAPPING.SEAT_CINEMA_ROOM + API.SEAT_CINEMA_ROOM.EDIT_SEAT_CINEMA_ROOM + `/${id}`, data, config);
      } else {
        await axios.post(LOCALHOST + REQUEST_MAPPING.SEAT_CINEMA_ROOM + API.SEAT_CINEMA_ROOM.INSERT_SEAT_CINEMA_ROOM, data, config);
      }
      backToList();
    } catch (e) {
      console.error('Error adding item: ', e);
    }
  }

  useEffect(() => {
    fetchSeat()
    fetchCinemaRoom()
    if (id) {
      fetchSeatCinemaRoomById(Number(id));
    }
  }, [id])

  const seatOptions = seats.map((s) => ({
    value: s.seatId.toString(),
    label: s.rowNumber + s.seatNumber,
  }));

  const cinemaRoomOptions = cinemaRooms.map((c) => ({
    value: c.id.toString(),
    label: c.cinemaRoomName,
  }));

  const backToList = () => {
    navigator("/dotheanh/seat-cinema-rooms");
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
        <div className="container mt-5" style={{ width: '1000px', display: 'flex', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <Form layout="vertical">
              <Form.Item label="Seat" required>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Select
                    mode="multiple"
                    placeholder="Seat"
                    options={seatOptions}
                    style={{ width: '100%', maxHeight: '300px', overflow: 'auto' }}
                    value={seat}
                    onChange={(value) => setSeat(value)}
                  />
                </div>
              </Form.Item>
              <Form.Item label="Cinema room" required>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Select
                    placeholder="Cinema room"
                    options={cinemaRoomOptions}
                    style={{ width: '100%', maxHeight: '300px', overflow: 'auto' }}
                    value={cinemaRoomId}
                    onChange={(value) => setCinemaRoomId(value)}
                  />
                </div>
              </Form.Item>
              <Form.Item label="Status" required>
                <Input value={status} onChange={() => setStatus('avaiable')} />
              </Form.Item>
              <Form.Item>
                <Popconfirm
                  title="Are you sure to submit this movie?"
                  onConfirm={() => handleInsertOrUpdateSeatCinemaRoom()}
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
    </>
  )
}

export default SeatCinemaRoom
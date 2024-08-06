import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API, LOCALHOST, REQUEST_MAPPING } from '../APIs/typing'
import axios from 'axios'
import { CinemaRoomm, Moviee, Theaterr } from '../Types'
import { Button, Form, Input, message, Popconfirm, Select, TimePicker } from 'antd'
import dayjs, { Dayjs } from 'dayjs'

const ShowTime: React.FC = () => {

  const [theater, setTheater] = useState<number>();
  const [movie, setMovie] = useState<number>();
  const [showDate, setShowDate] = useState<string>('');
  const [showTime, setShowTime] = useState<string>('');
  const [showTimeEnd, setShowTimeEnd] = useState<string>('');
  const [cinemaRoom, setCinemaRoom] = useState<number>();

  const [theaters, setTheaters] = useState<Theaterr[]>([]);
  const [cinemaRooms, setCinemaRooms] = useState<CinemaRoomm[]>([]);
  const [movies, setMovies] = useState<Moviee[]>([]);

  const navigator = useNavigate();
  const { id } = useParams();

  const fetchShowTime = async (id: number) => {
    try {
      const res = await axios.get(`${LOCALHOST}${REQUEST_MAPPING.SHOW_TIME}${API.SHOW_TIME.GETALL_SHOW_TIME}/${id}`);
      const showTimeData = res.data;
      setTheater(showTimeData.cinemaRoom.theaters.id);
      setCinemaRoom(showTimeData.cinemaRoom.id);
      setMovie(showTimeData.movie.id);
      setShowDate(showTimeData.showDate);
      setShowTime(showTimeData.showTime);
      setShowTimeEnd(showTimeData.showTimeEnd);
    } catch (err) {
      console.error('Error fetching show time: ', err);
    }
  }

  const fetchTheater = async () => {
    const res = await axios.get(`${LOCALHOST}${REQUEST_MAPPING.THEATER}${API.THEATER.GETALL_THEATER}`);
    setTheaters(res.data);
  }

  const fetchCinemaRoom = async (theaterId: number) => {
    try {
      const res = await axios.get(`${LOCALHOST}${REQUEST_MAPPING.CINEMA_ROOM}${API.CINEMA_ROOM.GETALL_CINEMA_ROOM}/theater/${theaterId}`);
      setCinemaRooms(res.data);
    } catch (err) {
      console.error('Error fetching cinema rooms: ', err);
    }
  }

  const fetchMovie = async () => {
    const res = await axios.get(`${LOCALHOST}${REQUEST_MAPPING.MOVIE}${API.MOVIE.GETALL_MOVIE}`);
    setMovies(res.data.content);
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
    if (!showDate) {
      message.error("Show date is required");
      return;
    }
    if (!showTime) {
      message.error("Show time is required");
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
        cinemaRoom: {
          id: cinemaRoom
        },
        movie: {
          id: movie
        },
        showDate: showDate,
        showTime: showTime,
        showTimeEnd: showTimeEnd
      };

      if (id) {
        await axios.put(
          `${LOCALHOST}${REQUEST_MAPPING.SHOW_TIME}${API.SHOW_TIME.EDIT_SHOW_TIME}/${id}`,
          data,
          config
        );
      } else {
        await axios.post(
          `${LOCALHOST}${REQUEST_MAPPING.SHOW_TIME}${API.SHOW_TIME.INSERT_SHOW_TIME}`,
          data,
          config
        );
      }

      backToList();
    } catch (e) {
      console.error('Error adding item: ', e);
    }
  };

  const backToList = () => {
    navigator("/dotheanh/show-times");
  };

  const handleTheaterChange = (value: string) => {
    setTheater(Number(value));
  };

  const handleMovieChange = (value: string) => {
    setMovie(Number(value));
  };

  const handleCinemaRoomChange = (value: string) => {
    setCinemaRoom(Number(value));
  };

  const optionsTheater = useMemo(() => theaters.map((tt) => ({
    value: tt.id.toString(),
    label: tt.theaterName,
  })), [theaters]);

  const optionsMovie = useMemo(() => movies.map((mv) => ({
    value: mv.id.toString(),
    label: mv.movieName,
  })), [movies]);

  const optionsCinemaRoom = useMemo(() => cinemaRooms.map((cr) => ({
    value: cr.id.toString(),
    label: cr.cinemaRoomName,
  })), [cinemaRooms]);

  useEffect(() => {
    fetchMovie();
    fetchTheater();
    if (id) {
      fetchShowTime(Number(id));
    }
  }, [id]);

  useEffect(() => {
    if (theater) {
      fetchCinemaRoom(theater);
    }
  }, [theater]);

  useEffect(() => {
    if (movie && showTime) {
      const selectedMovie = movies.find((mv) => mv.id === movie);
      if (selectedMovie) {
        const endTime = calculateEndTime(showTime, selectedMovie.duration);
        setShowTimeEnd(endTime);
      }
    }
  }, [movie, showTime, movies]);

  const handleTimeChange = (date: Dayjs | null, dateString: string | string[]) => {
    if (typeof dateString === 'string') {
      setShowTime(dateString);
      const selectedMovie = movies.find((mv) => mv.id === movie);
      if (selectedMovie) {
        const endTime = calculateEndTime(dateString, selectedMovie.duration);
        setShowTimeEnd(endTime);
      }
    }
  }

  const handleTimeEndChange = (date: Dayjs | null, dateString: string | string[]) => {
    if (typeof dateString === 'string') {
      setShowTimeEnd(dateString);
    }
  }

  const roundUpToNearestHalfHour = (date: Dayjs) => {
    const minutes = date.minute();
    const roundedMinutes = Math.ceil(minutes / 30) * 30;
    return date.minute(roundedMinutes).second(0);
  }

  const calculateEndTime = (startTime: string, duration: number) => {
    const start = dayjs(startTime, 'HH:mm');
    const end = start.add(duration, 'minute');
    return roundUpToNearestHalfHour(end).format('HH:mm');
  }

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '600px' }}>
        <Form layout="vertical">
          <Form.Item label="Theater name" required>
            <Select
              placeholder="Select Theater"
              onChange={handleTheaterChange}
              options={optionsTheater}
              value={theater?.toString()}
            />
          </Form.Item>
          <Form.Item label="Cinema room" required>
            <Select
              placeholder="Select Cinema Room"
              onChange={handleCinemaRoomChange}
              options={optionsCinemaRoom}
              value={cinemaRoom?.toString()}
            />
          </Form.Item>
          <Form.Item label="Movie name" required>
            <Select
              placeholder="Select Movie"
              onChange={handleMovieChange}
              options={optionsMovie}
              value={movie?.toString()}
            />
          </Form.Item>
          <Form.Item label="Show date" required>
            <Input type='date' placeholder="Show date" value={showDate} onChange={(e) => setShowDate(e.target.value)} />
          </Form.Item>
          <Form.Item label="Show time" required>
            <TimePicker
              value={showTime ? dayjs(showTime, 'HH:mm') : null}
              format="HH:mm"
              onChange={handleTimeChange}
              placeholder="Start"
            />
            <TimePicker
              style={{marginLeft: 20}}
              value={showTimeEnd ? dayjs(showTimeEnd, 'HH:mm') : null}
              format="HH:mm"
              onChange={handleTimeEndChange}
              placeholder="End"
              disabled
            />
          </Form.Item>
          <Form.Item>
            <Popconfirm
              title="Are you sure to submit this show time?"
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
  );
}

export default ShowTime;

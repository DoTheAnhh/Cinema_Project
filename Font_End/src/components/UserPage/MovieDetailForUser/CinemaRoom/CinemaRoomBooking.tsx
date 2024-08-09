import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import UserFooter from '../../Footer/UserFooter';
import { Button } from 'antd';
import UserHeader from '../../Header/UserHeader';
import { Seatt, ShowTimee } from '../../../Types';
import { useLocation } from 'react-router-dom';
import { API, LOCALHOST, REQUEST_MAPPING } from '../../../APIs/typing';
import './CinemaRoom.css';

interface LocationState {
  showTimes: ShowTimee[];
  selectedTheater: string;
  selectedTime: string;
  cinemaRoomId: number;
  movieName: string;
  banner: string;
  selectedDate: string;
}

const CinemaRoomBooking: React.FC = () => {
  const location = useLocation();
  const { showTimes, selectedTheater, selectedTime, cinemaRoomId, movieName, banner, selectedDate } = location.state as LocationState;

  const [cinemaRoom, setCinemaRoom] = useState<any>(null);
  const [currentSelectedTime, setCurrentSelectedTime] = useState<string>(selectedTime);
  const [currentSelectedDate, setCurrentSelectedDate] = useState<string>(selectedDate);
  const [currentCinemaRoomId, setCurrentCinemaRoomId] = useState<number>(cinemaRoomId);
  const [selectedSeats, setSelectedSeats] = useState<Set<number>>(new Set());
  const [seats, setSeats] = useState<Seatt[]>([]);

  const groupedShowTimes = showTimes.reduce((acc, showTime) => {
    const theaterName = showTime.cinemaRoom.theaters.theaterName;
    if (!acc[theaterName]) {
      acc[theaterName] = [];
    }
    acc[theaterName].push({ showTime: showTime.showTime, cinemaRoomId: showTime.cinemaRoom.id });
    return acc;
  }, {} as { [key: string]: { showTime: string, cinemaRoomId: number }[] });

  const timesForSelectedTheater = groupedShowTimes[selectedTheater] || [];

  const handleTimeClick = (time: string, date: string, cinemaRoomId: number) => {
    setCurrentSelectedTime(time);
    setCurrentSelectedDate(date);
    setCurrentCinemaRoomId(cinemaRoomId);
  };

  const fetchCinemaRoom = async () => {
    try {
      const response = await fetch(`${LOCALHOST}${REQUEST_MAPPING.CINEMA_ROOM}${API.CINEMA_ROOM.GETALL_CINEMA_ROOM}/${currentCinemaRoomId}`);
      const data = await response.json();
      setCinemaRoom(data);
    } catch (error) {
      console.error('Failed to fetch cinema room:', error);
    }
  };

  const fetchSeats = async () => {
    try {
      const response = await fetch(`${LOCALHOST}${REQUEST_MAPPING.SEAT}${API.SEAT.GET_ALL_SEAT}/cinema-room/${currentCinemaRoomId}/show-time/${currentSelectedTime}`);
      const data = await response.json();
      console.log('Fetched seats data:', data);

      setSeats(data.map((item: any) => ({
        ...item,
        status: item.status ? item.status : 'available',
      })));
    } catch (error) {
      console.error('Failed to fetch seats:', error);
    }
  };

  const handleSeatClick = (seat: Seatt) => {
    if (seat.status !== 'booked') {
      setSelectedSeats(prev => {
        const newSelectedSeats = new Set(prev);
        if (newSelectedSeats.has(seat.seatId)) {
          newSelectedSeats.delete(seat.seatId);
        } else {
          newSelectedSeats.add(seat.seatId);
        }
        return newSelectedSeats;
      });
    }
  };

  useEffect(() => {
    if (currentCinemaRoomId) {
      fetchCinemaRoom();
      fetchSeats();
    }
  }, [currentCinemaRoomId, currentSelectedTime]);

  useEffect(() => {
    fetchSeats();
    setSelectedSeats(new Set());
  }, [currentSelectedTime]);

  const groupedSeats = seats.reduce((acc, seat) => {
    if (!acc[seat.rowNumber]) {
      acc[seat.rowNumber] = [];
    }
    acc[seat.rowNumber].push(seat);
    return acc;
  }, {} as { [key: string]: Seatt[] });

  return (
    <>
      <UserHeader />
      <div className="container" style={{ display: 'flex', marginLeft: 150, marginTop: 120 }}>
        <div className="table" style={{ flex: 2, marginRight: 20 }}>
          <div className="col-12 mb-3" style={{ marginTop: 20 }}>
            <div style={{
              fontWeight: 'bold',
              fontFamily: 'Noto Sans JP, sans-serif',
              fontSize: '18px',
            }}>
              {selectedTheater}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 20 }}>
              {timesForSelectedTheater
                .map(({ showTime, cinemaRoomId }) => dayjs(showTime, 'HH:mm'))
                .sort((a, b) => a.isBefore(b) ? -1 : 1)
                .map((time, j) => (
                  <Button
                    key={j}
                    style={{
                      width: 90,
                      height: 35,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      margin: '4px',
                    }}
                    onClick={() => handleTimeClick(time.format('HH:mm'), selectedDate || '', timesForSelectedTheater[j].cinemaRoomId)}
                  >
                    {time.format('HH:mm')}
                  </Button>
                ))}
            </div>
          </div>
          <div className="center-container" style={{ marginLeft: 0, width: 760 }}>
            <div className="seat-layout">
              <ul>
                {Object.entries(groupedSeats).reverse().map(([rowNumber, rowSeats]) => (
                  <li key={rowNumber} className="seat-row">
                    <span className="row-label left-label" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>{rowNumber}</span>
                    <div className="seat-grid" style={{ marginLeft: 200 }}>
                      {rowSeats.map(seat => (
                        <div
                          key={seat.seatId}
                          className={`seat ${selectedSeats.has(seat.seatId) ? 'selected' : ''} ${seat.status === 'booked' ? 'booked' : ''}`}
                          style={{
                            cursor: seat.status === 'booked' ? 'not-allowed' : 'pointer',
                            opacity: seat.status === 'booked' ? 0.5 : 1,
                            fontFamily: 'Noto Sans JP, sans-serif'
                          }}
                          onClick={() => seat.status !== 'booked' && handleSeatClick(seat)}
                        >
                          {seat.seatNumber}
                        </div>
                      ))}


                    </div>
                    <span className="row-label right-label" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>{rowNumber}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div style={{ margin: '10px 360px', fontFamily: 'Noto Sans JP, sans-serif' }}>Màn hình</div>
            <div style={{ backgroundColor: 'orange', width: 765, height: 10, marginBottom: 20 }}></div>
          </div>
        </div>
        <div style={{ flex: 1, marginLeft: -200 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', top: '0', marginTop: 100 }}>
            <div style={{ display: 'flex', marginTop: 10 }}>
              <img style={{ height: 200, width: 140, padding: 10, marginLeft: -200 }} src={banner} alt="Movie Banner" />
              <div style={{ marginLeft: 10, fontFamily: 'Noto Sans JP, sans-serif', fontWeight: 'bold', marginTop: 20 }}>
                {movieName}
              </div>
            </div>
            <div style={{ marginTop: 20, width: '100%', fontFamily: 'Noto Sans JP, sans-serif' }}>
              <strong>{selectedTheater}</strong> - {cinemaRoom ? cinemaRoom.cinemaRoomName : 'Loading...'}
            </div>
            <div style={{ marginTop: 15, width: '100%', fontFamily: 'Noto Sans JP, sans-serif' }}>
              Suất: <strong>{currentSelectedTime}</strong> - {currentSelectedDate}
            </div>
            <div className="seat-info" style={{ marginTop: 25, width: '100%', fontFamily: 'Noto Sans JP, sans-serif' }}>
              <strong>Ghế đã chọn: </strong>
              {Array.from(selectedSeats).map(seatId => {
                const seat = seats.find(s => s.seatId === seatId);
                return seat ? (
                  <div key={seatId} className="seat-details">
                    {seat.rowNumber}{seat.seatNumber}
                  </div>
                ) : null;
              })}
            </div>
            <div style={{ marginTop: 30, width: '100%', fontFamily: 'Noto Sans JP, sans-serif' }}>
              <strong>Tổng cộng: </strong>
            </div>
          </div>
        </div>
      </div>
      <UserFooter />
    </>
  );
};

export default CinemaRoomBooking;

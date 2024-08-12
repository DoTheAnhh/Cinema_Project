import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import UserFooter from '../../Footer/UserFooter';
import { Button, message } from 'antd';
import UserHeader from '../../Header/UserHeader';
import { Seatt, ShowTimee } from '../../../Types';
import { useLocation, useNavigate } from 'react-router-dom';
import { API, LOCALHOST, REQUEST_MAPPING } from '../../../APIs/typing';
import './css/CinemaRoom.css';
import MovieInfo from './MovieInfo';

interface LocationState {
  showTimes: ShowTimee[];
  selectedTheater: string;
  selectedTime: string;
  cinemaRoomId: number;
  movieName: string;
  banner: string;
  selectedDate: string;
  ticketPrice: number
}

const CinemaRoomBooking: React.FC = () => {
  const location = useLocation();
  const { showTimes, selectedTheater, selectedTime, cinemaRoomId, movieName, banner, selectedDate, ticketPrice } = location.state as LocationState;

  const [cinemaRoom, setCinemaRoom] = useState<any>(null);

  const [currentSelectedTime, setCurrentSelectedTime] = useState<string>(selectedTime);
  const [currentSelectedDate, setCurrentSelectedDate] = useState<string>(selectedDate);
  const [currentCinemaRoomId, setCurrentCinemaRoomId] = useState<number>(cinemaRoomId);
  const [currentTicketPrice, setCurrentTicketPrice] = useState<number>(ticketPrice);

  const [selectedSeats, setSelectedSeats] = useState<Set<number>>(new Set());
  const [seats, setSeats] = useState<Seatt[]>([]);

  const navigator = useNavigate()

  const groupedShowTimes = showTimes.reduce((acc, showTime) => {
    const theaterName = showTime.cinemaRoom.theaters.theaterName;
    if (!acc[theaterName]) {
      acc[theaterName] = [];
    }
    acc[theaterName].push({ showTime: showTime.showTime, cinemaRoomId: showTime.cinemaRoom.id, ticketPrice: showTime.movie.ticketPrice });
    return acc;
  }, {} as { [key: string]: { showTime: string, cinemaRoomId: number, ticketPrice: string }[] });

  const timesForSelectedTheater = groupedShowTimes[selectedTheater] || [];

  const handleTimeClick = (time: string, date: string, cinemaRoomId: number, ticketPrice: number) => {
    setCurrentSelectedTime(time);
    setCurrentSelectedDate(date);
    setCurrentCinemaRoomId(cinemaRoomId);
    setCurrentTicketPrice(ticketPrice)
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
          if (newSelectedSeats.size >= 8) {
            message.warning('Bạn chỉ có thể chọn tối đa 8 ghế.');
            return prev;
          }
          newSelectedSeats.add(seat.seatId);
        }

        return newSelectedSeats;
      });
    }
  };

  const backToHome = () => {
    navigator(`/user`);
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

  const handleContinue = () => {
    if (selectedSeats.size === 0) {
      message.error('Bạn chưa chọn ghế');
      return;
    }

  };

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
                .map(({ showTime }) => dayjs(showTime, 'HH:mm'))
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
                    onClick={() => handleTimeClick(time.format('HH:mm'), selectedDate || '', timesForSelectedTheater[j].cinemaRoomId, Number(timesForSelectedTheater[j].ticketPrice))}
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
          <div style={{ display: 'flex' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#D4D4D4D4', marginRight: '10px', borderRadius: 5 }}></div>
            <div>Ghế đã bán</div>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#034EA2', marginRight: '10px', marginLeft: 20, borderRadius: 5 }}></div>
            <div>Ghế đang chọn</div>
            <div style={{ marginLeft: 150 }}></div>
            <div style={{ width: '20px', height: '20px', border: '1px solid #FFA500', marginRight: '10px', marginLeft: 20, borderRadius: 5 }}></div>
            <div>Ghế vip</div>
            <div style={{ width: '20px', height: '20px', border: '1px solid #D4D4D4D4', marginRight: '10px', marginLeft: 20, borderRadius: 5 }}></div>
            <div>Ghế đơn</div>
            <div style={{ width: '40px', height: '20px', border: '1px solid #034EA2', marginRight: '10px', marginLeft: 20, borderRadius: 5 }}></div>
            <div>Ghế đôi</div>
          </div>
        </div>
        <MovieInfo
          banner={banner}
          movieName={movieName}
          selectedTheater={selectedTheater}
          cinemaRoom={cinemaRoom}
          currentSelectedTime={currentSelectedTime}
          selectedSeats={selectedSeats}
          seats={seats}
          currentTicketPrice={currentTicketPrice}
          backToHome={backToHome}
          handleContinue={handleContinue}
        />
      </div>
      <UserFooter />
    </>
  );
};

export default CinemaRoomBooking;
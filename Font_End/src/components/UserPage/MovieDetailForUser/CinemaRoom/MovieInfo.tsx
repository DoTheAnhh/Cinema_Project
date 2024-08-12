import React from 'react';
import { Button } from 'antd';
import dayjs from 'dayjs';

interface MovieInfoProps {
  banner: string;
  movieName: string;
  selectedTheater: string;
  cinemaRoom: { cinemaRoomName: string } | null;
  currentSelectedTime: string;
  selectedSeats: Set<number>;
  seats: { seatId: number; rowNumber: string; seatNumber: number }[];
  currentTicketPrice: number;
  backToHome: () => void;
  handleContinue: () => void;
}


const MovieInfo: React.FC<MovieInfoProps> = ({
  banner,
  movieName,
  selectedTheater,
  cinemaRoom,
  currentSelectedTime,
  selectedSeats,
  seats,
  currentTicketPrice,
  backToHome,
  handleContinue,
}) => {
  return (
    <div style={{ flex: 1, marginLeft: -200, position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          top: '0',
          marginTop: 100,
        }}
      >
        <div style={{ display: 'flex', marginTop: 10 }}>
          <div
            style={{
              height: 10,
              width: 400,
              marginLeft: '-190px',
              backgroundColor: '#FFA500',
              borderRadius: '10px 10px 0 0',
            }}
          ></div>
          <img
            style={{ height: 200, width: 140, padding: 10, marginLeft: -410 }}
            src={banner}
            alt="Movie Banner"
          />
          <div
            style={{
              marginLeft: 10,
              fontFamily: 'Noto Sans JP, sans-serif',
              fontWeight: 'bold',
              marginTop: 20,
              maxWidth: '180px',
              wordWrap: 'break-word',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            {movieName}
          </div>
        </div>
        <div
          style={{
            marginTop: 20,
            width: '100%',
            fontFamily: 'Noto Sans JP, sans-serif',
          }}
        >
          <strong>{selectedTheater}</strong> -{' '}
          {cinemaRoom ? cinemaRoom.cinemaRoomName : 'Loading...'}
        </div>
        <div
          style={{
            marginTop: 15,
            width: '100%',
            fontFamily: 'Noto Sans JP, sans-serif',
          }}
        >
          Suất: <strong>{currentSelectedTime}</strong> -{' '}
          {dayjs(currentSelectedTime, 'HH:mm').format('dddd')},{' '}
          {dayjs(currentSelectedTime, 'HH:mm').format('DD/MM/YYYY')}
        </div>
        <div
          className="seat-info"
          style={{
            marginTop: 25,
            width: '100%',
            fontFamily: 'Noto Sans JP, sans-serif',
          }}
        >
          <strong>Ghế đã chọn: </strong>
          {Array.from(selectedSeats).map((seatId) => {
            const seat = seats.find((s) => s.seatId === seatId);
            return seat ? (
              <div key={seatId} className="seat-details">
                {seat.rowNumber}
                {seat.seatNumber}
              </div>
            ) : null;
          })}
        </div>
        <div>
          <div
            style={{
              marginTop: '30px',
              width: '100%',
              fontFamily: 'Noto Sans JP, sans-serif',
            }}
          >
            <hr
              style={{
                marginLeft: -100,
                marginBottom: 15,
                borderTop: '1px dashed black',
              }}
            />
            <strong>
              Tổng cộng:
              <p
                style={{
                  marginLeft: 150,
                  marginTop: -23,
                  color: 'red',
                }}
              >
                {Number(
                  selectedSeats.size * Number(currentTicketPrice)
                ).toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </p>
            </strong>
            <hr
              style={{
                marginLeft: -100,
                marginTop: 15,
                borderTop: '1px dashed black',
              }}
            />
          </div>
          <div>
            <Button
              style={{
                backgroundColor: 'white',
                color: '#FF953F',
                width: 150,
                marginLeft: -100,
                marginTop: 50,
                marginBottom: 50,
              }}
              onClick={backToHome}
            >
              Quay lại
            </Button>
            <Button
              style={{
                backgroundColor: '#FF953F',
                color: 'white',
                width: 150,
                marginLeft: 100,
                marginTop: 50,
                marginBottom: 50,
              }}
              onClick={handleContinue}
            >
              Tiếp tục
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;

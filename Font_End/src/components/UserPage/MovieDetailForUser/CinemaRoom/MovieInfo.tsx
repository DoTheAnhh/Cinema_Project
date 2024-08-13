import React from 'react';
import { Button } from 'antd';
import dayjs from 'dayjs';
import './css/MovieInfo.css'
import { Foodd } from '../../../Types';

interface MovieInfoProps {
  banner: string;
  movieName: string;
  selectedTheater: string;
  cinemaRoom: { cinemaRoomName: string } | null;
  currentSelectedTime: string;
  selectedSeats: Set<number>;
  seats: { seatId: number; rowNumber: string; seatNumber: number }[];
  currentTicketPrice: number;
  foods: Foodd[],
  quantities: number[],
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
  foods,
  quantities,
  backToHome,
  handleContinue,
}) => {

  const totalFoodPrice = foods.reduce((total, food, index) => {
    return total + (quantities[index] * parseFloat(food.price));
  }, 0);

  const totalPrice = selectedSeats.size * currentTicketPrice + totalFoodPrice;


  return (
    <>
      <div className="movie-info-container">
        <div className="movie-info-content">
          <div className="movie-header">
            <div className="movie-banner">
              <img src={banner} alt="Movie Banner" />
            </div>
            <div className="movie-title">{movieName}</div>
          </div>
          <div className="movie-details">
            <strong>{selectedTheater}</strong> -{' '}
            {cinemaRoom ? cinemaRoom.cinemaRoomName : 'Loading...'}
          </div>
          <div className="showtime">
            Suất: <strong>{currentSelectedTime}</strong> -{' '}
            {dayjs(currentSelectedTime, 'HH:mm').format('dddd')},{' '}
            {dayjs(currentSelectedTime, 'HH:mm').format('DD/MM/YYYY')}
          </div>
          <div className="seat-info">
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

          <div className="total-price">
            <div>
              <div className="food-selected">
                {foods.filter((food: any, index: any) => quantities[index] > 0).length > 0 && (
                  <div>
                    <hr className="divider" />
                    <div style={{marginBottom: 5}}>
                      <strong>Đồ ăn, uống đã chọn:</strong>
                    </div>
                    <div style={{marginLeft: 10}}>
                      {foods.map((food: any, index: any) =>
                        quantities[index] > 0 && (
                          <div key={food.foodId}>
                            <span><strong>- {food.foodName}</strong></span>
                            <span>
                              {' - Số lượng: '}{quantities[index]}
                              {' - Giá: '}{parseFloat(food.price).toLocaleString('vi-VN', {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })} VND
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>

            </div>
            <hr className="divider" />
            <strong>
              Tổng cộng:
              <p className="price">
                {Number(totalPrice).toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </p>
            </strong>
            <hr className="divider" />
          </div>
          <div className="buttons">
            <Button className="back-button" onClick={backToHome}>
              Quay lại
            </Button>
            <Button className="continue-button" onClick={handleContinue}>
              Tiếp tục
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieInfo;

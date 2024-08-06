import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from 'antd';
import dayjs from 'dayjs';
import { ShowTimee } from '../../../Types';
import UserHeader from '../../Header/UserHeader';
import UserFooter from '../../Footer/UserFooter';

interface LocationState {
  showTimes: ShowTimee[];
  selectedTheater: string;
  selectedTime: string; // Add selectedTime to the LocationState
}

const CinemaRoomBooking: React.FC = () => {
  const location = useLocation();
  const { showTimes, selectedTheater, selectedTime } = location.state as LocationState;

  // Initialize the selectedTime state with the received selectedTime
  const [currentSelectedTime, setCurrentSelectedTime] = useState<string>(selectedTime);

  const groupedShowTimes = showTimes.reduce((acc, showTime) => {
    const theaterName = showTime.cinemaRoom.theaters.theaterName;
    if (!acc[theaterName]) {
      acc[theaterName] = [];
    }
    acc[theaterName].push(showTime.showTime);
    return acc;
  }, {} as { [key: string]: string[] });

  const timesForSelectedTheater = groupedShowTimes[selectedTheater] || [];

  const handleTimeClick = (time: string) => {
    setCurrentSelectedTime(time);
    // Optionally, navigate to another route or perform other actions
  };

  return (
    <>
      <UserHeader />
      <div className="container table" style={{ marginLeft: 200, marginTop: 120 }}>
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
              .map(time => dayjs(time, 'HH:mm'))
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
                    backgroundColor: time.format('HH:mm') === currentSelectedTime ? '#034EA2' : '#f0f0f0', // Default color
                    color: time.format('HH:mm') === currentSelectedTime ? 'white' : 'black', // Default text color
                  }}
                  onClick={() => handleTimeClick(time.format('HH:mm'))}
                >
                  {time.format('HH:mm')}
                </Button>
              ))}
          </div>
          <div style={{ marginTop: 20, fontSize: '16px' }}>
            <strong>Selected Time: </strong>{currentSelectedTime}
          </div>
        </div>
      </div>
      <UserFooter />
    </>
  );
};

export default CinemaRoomBooking;

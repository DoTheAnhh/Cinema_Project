import React, { useState } from 'react'
import { Theaterr } from '../Types';

const SeatCinemaRoom: React.FC = () => {

  const [rowNumber, setRowNumber] = useState<string>('');
  const [seatNumber, setSeatNumber] = useState<number>(0);
  const [seatType, setSeatType] = useState<string>('');
  const [cinemaRoomName, setCinemaRoomName] = useState<string>('');
  const [theaters, setTheaters] = useState<Theaterr>();
  const [status, setStatus] = useState<string>('');

  

  return (
    <div>SeatCinemaRoom</div>
  )
}

export default SeatCinemaRoom
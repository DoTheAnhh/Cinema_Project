package com.example.cinema_project.serivce;

import com.example.cinema_project.dto.SeatDTO;
import com.example.cinema_project.dto.SeatStatusDTO;
import com.example.cinema_project.entity.Seat;

import java.util.List;

public interface SeatService {
    List<SeatDTO> findSeatCinemaRoomsByCinemaRoomIdAndShowTime(Long cinemaRoomId, String showTime);

    void updateStatus(Long cinemaRoomId, Long seatId, String status);

    SeatStatusDTO getSeatStatus(Long cinemaRoomId, Long seatId);
}

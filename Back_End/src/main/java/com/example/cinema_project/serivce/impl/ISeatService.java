package com.example.cinema_project.serivce.impl;

import com.example.cinema_project.dto.SeatDTO;
import com.example.cinema_project.dto.SeatStatusDTO;
import com.example.cinema_project.repository.SeatRepository;
import com.example.cinema_project.serivce.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ISeatService implements SeatService {

    @Autowired
    SeatRepository seatRepository;

    @Override
    public List<SeatDTO> findSeatCinemaRoomsByCinemaRoomIdAndShowTime(Long cinemaRoomId, String showTime) {
        return seatRepository.findSeatCinemaRoomsByCinemaRoomIdAndShowTime(cinemaRoomId, showTime);
    }

    @Override
    public void updateStatus(Long cinemaRoomId, Long seatId, String status) {
        seatRepository.updateStatus(status, cinemaRoomId, seatId);
    }

    @Override
    public SeatStatusDTO getSeatStatus(Long cinemaRoomId, Long seatId) {
        return seatRepository.findStatusByCinemaRoomIdAndSeatId(cinemaRoomId, seatId);
    }
}

package com.example.cinema_project.serivce.impl;

import com.example.cinema_project.entity.Seat;
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
    public List<Seat> getSeatsByCinemaRoomId(Long cinemaRoomId) {
        return seatRepository.findByCinemaRoomId(cinemaRoomId);
    }
}

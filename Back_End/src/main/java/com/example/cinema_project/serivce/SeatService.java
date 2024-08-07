package com.example.cinema_project.serivce;

import com.example.cinema_project.entity.Seat;

import java.util.List;

public interface SeatService {

    List<Seat> getSeatsByCinemaRoomId(Long cinemaRoomId);
}

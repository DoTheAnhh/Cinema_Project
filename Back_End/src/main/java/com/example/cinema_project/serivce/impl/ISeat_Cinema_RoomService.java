package com.example.cinema_project.serivce.impl;

import com.example.cinema_project.entity.Seat;
import com.example.cinema_project.entity.Seat_Cinema_Room;
import com.example.cinema_project.repository.Seat_CinemaRoomRepository;
import com.example.cinema_project.serivce.Seat_Cinema_RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ISeat_Cinema_RoomService implements Seat_Cinema_RoomService {

    @Autowired
    Seat_CinemaRoomRepository seatCinemaRoomRepository;
}

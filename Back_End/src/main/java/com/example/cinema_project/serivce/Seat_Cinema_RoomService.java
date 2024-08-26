package com.example.cinema_project.serivce;

import com.example.cinema_project.dto.SeatCinemaRoomDTO;
import com.example.cinema_project.entity.Seat_Cinema_Room;

import java.util.List;

public interface Seat_Cinema_RoomService {

    void checkAndMakeSeatsAvailable();

    List<SeatCinemaRoomDTO> findAll();
}

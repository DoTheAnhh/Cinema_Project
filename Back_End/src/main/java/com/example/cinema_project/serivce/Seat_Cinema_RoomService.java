package com.example.cinema_project.serivce;

import com.example.cinema_project.dto.SeatCinemaRoomDTO;
import com.example.cinema_project.entity.Seat_Cinema_Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface Seat_Cinema_RoomService {

    void checkAndMakeSeatsAvailable();

    Page<SeatCinemaRoomDTO> findAll(Pageable pageable);

    List<Seat_Cinema_Room> insertSeatCinemaRoom(SeatCinemaRoomDTO seatCinemaRoomDTO);
}

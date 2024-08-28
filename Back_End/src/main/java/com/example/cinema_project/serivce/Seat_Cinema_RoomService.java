package com.example.cinema_project.serivce;

import com.example.cinema_project.dto.SeatCinemaRoom.GetByIdSeatCinemaRoomDTO;
import com.example.cinema_project.dto.SeatCinemaRoom.SeatCinemaRoomDTO;
import com.example.cinema_project.entity.Seat_Cinema_Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface Seat_Cinema_RoomService {

    void checkAndMakeSeatsAvailable();

    Page<SeatCinemaRoomDTO> findAll(Pageable pageable);

    List<Seat_Cinema_Room> insertSeatCinemaRoom(SeatCinemaRoomDTO seatCinemaRoomDTO);

    List<Seat_Cinema_Room> editSeatCinemaRoom(SeatCinemaRoomDTO seatCinemaRoomDTO, Long id);

    Optional<GetByIdSeatCinemaRoomDTO> getSeatCinemaRoomById(Long id);
}

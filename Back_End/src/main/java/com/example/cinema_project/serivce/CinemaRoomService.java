package com.example.cinema_project.serivce;

import com.example.cinema_project.dto.CinemaRoomDTO;
import com.example.cinema_project.entity.CinemaRoom;

import java.util.List;
import java.util.Optional;

public interface CinemaRoomService {
    List<CinemaRoom> findAll();

    Optional<CinemaRoom> findById(Long id);

    CinemaRoom insertCinemaRoom(CinemaRoomDTO cinemaRoomDTO);

    CinemaRoom editCinemaRoom(Long id, CinemaRoomDTO cinemaRoomDTO);
}

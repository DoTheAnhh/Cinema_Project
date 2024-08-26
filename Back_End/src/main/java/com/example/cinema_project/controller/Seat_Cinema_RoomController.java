package com.example.cinema_project.controller;

import com.example.cinema_project.dto.SeatCinemaRoomDTO;
import com.example.cinema_project.entity.Seat_Cinema_Room;
import com.example.cinema_project.repository.Seat_CinemaRoomRepository;
import com.example.cinema_project.serivce.Seat_Cinema_RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/seat-cinema-rooms")
public class Seat_Cinema_RoomController {
    @Autowired
    private Seat_Cinema_RoomService seatCinemaRoomService;

    @GetMapping("")
    public List<SeatCinemaRoomDTO> findAllSeatCinemaRooms(){
        return seatCinemaRoomService.findAll();
    }
}


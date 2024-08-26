package com.example.cinema_project.controller;

import com.example.cinema_project.dto.SeatCinemaRoomDTO;
import com.example.cinema_project.serivce.Seat_Cinema_RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/seat-cinema-rooms")
public class Seat_Cinema_RoomController {
    @Autowired
    private Seat_Cinema_RoomService seatCinemaRoomService;

    @GetMapping("")
    public Page<SeatCinemaRoomDTO> findAllSeatCinemaRooms(@RequestParam int page, @RequestParam int size) {
        Pageable pageable = PageRequest.of(page, size);
        return seatCinemaRoomService.findAll(pageable);
    }
}


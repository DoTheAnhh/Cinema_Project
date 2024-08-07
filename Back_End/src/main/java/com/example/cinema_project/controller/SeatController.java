package com.example.cinema_project.controller;

import com.example.cinema_project.entity.Seat;
import com.example.cinema_project.serivce.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/seats")
public class SeatController {

    @Autowired
    SeatService seatService;

    @GetMapping("/cinemaRoom/{cinemaRoomId}")
    public List<Seat> getSeatsByCinemaRoomId(@PathVariable Long cinemaRoomId) {
        return seatService.getSeatsByCinemaRoomId(cinemaRoomId);
    }
}

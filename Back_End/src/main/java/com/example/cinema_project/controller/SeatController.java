package com.example.cinema_project.controller;

import com.example.cinema_project.dto.SeatDTO;
import com.example.cinema_project.entity.Seat;
import com.example.cinema_project.repository.SeatRepository;
import com.example.cinema_project.serivce.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/seats")
public class SeatController {

    @Autowired
    SeatService seatService;

    @GetMapping("/cinema-room/{cinemaRoomId}/show-time/{showTime}")
    public List<SeatDTO> getSeatsByCinemaRoomAndShowTime(
            @PathVariable Long cinemaRoomId,
            @PathVariable String showTime) {
        return seatService.findSeatCinemaRoomsByCinemaRoomIdAndShowTime(cinemaRoomId, showTime);
    }
}

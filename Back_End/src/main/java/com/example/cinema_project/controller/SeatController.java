package com.example.cinema_project.controller;

import com.example.cinema_project.dto.SeatDTO;
import com.example.cinema_project.dto.SeatStatusDTO;
import com.example.cinema_project.entity.Seat;
import com.example.cinema_project.repository.SeatRepository;
import com.example.cinema_project.serivce.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @PutMapping("/update-status")
    public void updateStatus(@RequestParam Long cinemaRoomId, @RequestParam Long seatId, @RequestParam String status) {
        seatService.updateStatus(cinemaRoomId, seatId, status);
    }

    @GetMapping("/check-status")
    public ResponseEntity<SeatStatusDTO> checkSeatStatus(@RequestParam Long cinemaRoomId, @RequestParam Long seatId) {
        SeatStatusDTO statusDTO = seatService.getSeatStatus(cinemaRoomId, seatId);
        if (statusDTO != null) {
            return ResponseEntity.ok(statusDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

}

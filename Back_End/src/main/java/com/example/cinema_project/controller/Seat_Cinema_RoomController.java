package com.example.cinema_project.controller;

import com.example.cinema_project.dto.SeatCinemaRoom.GetByIdSeatCinemaRoomDTO;
import com.example.cinema_project.dto.SeatCinemaRoom.SeatCinemaRoomDTO;
import com.example.cinema_project.entity.Seat_Cinema_Room;
import com.example.cinema_project.serivce.Seat_Cinema_RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("/{id}")
    public Optional<GetByIdSeatCinemaRoomDTO> findSeatCinemaRoomById(@PathVariable Long id) {
        return seatCinemaRoomService.getSeatCinemaRoomById(id);
    }

    @PostMapping("/insert-seat-cinema-room")
    public ResponseEntity<List<Seat_Cinema_Room>> addSeats(@RequestBody SeatCinemaRoomDTO seatCinemaRoomDTO) {
        try {
            List<Seat_Cinema_Room> savedSeats = seatCinemaRoomService.insertSeatCinemaRoom(seatCinemaRoomDTO);
            return new ResponseEntity<>(savedSeats, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}


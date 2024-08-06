package com.example.cinema_project.controller;

import com.example.cinema_project.dto.CinemaRoomDTO;
import com.example.cinema_project.dto.MovieDTO;
import com.example.cinema_project.entity.CinemaRoom;
import com.example.cinema_project.entity.Movie;
import com.example.cinema_project.serivce.CinemaRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/cinema-rooms")
public class CinemaRoomController {

    @Autowired
    CinemaRoomService cinemaRoomService;

    @GetMapping("")
    public List<CinemaRoom> findAll() {
        return cinemaRoomService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<CinemaRoom> getCinemaRoomsById(@PathVariable Long id) {
        return cinemaRoomService.findById(id);
    }

    @PostMapping("/insert-cinema-room")
    public ResponseEntity<CinemaRoom> addMovie(@RequestBody CinemaRoomDTO cinemaRoomDTO) {
        return new ResponseEntity<>(cinemaRoomService.insertCinemaRoom(cinemaRoomDTO), HttpStatus.CREATED);
    }

    @PutMapping("/edit-cinema-room/{id}")
    public ResponseEntity<CinemaRoom> editMovie(@PathVariable Long id, @RequestBody CinemaRoomDTO cinemaRoomDTO) {
        try {
            return new ResponseEntity<>(cinemaRoomService.editCinemaRoom(id, cinemaRoomDTO), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/theater/{theaterId}")
    public List<CinemaRoom> getCinemaRoomsByTheaterId(@PathVariable Long theaterId) {
        return cinemaRoomService.getCinemaRoomsByTheaterId(theaterId);
    }
}

package com.example.cinema_project.controller;

import com.example.cinema_project.entity.CinemaRoom;
import com.example.cinema_project.serivce.CinemaRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/cinema-rooms")
public class CinemaRoomController {

    @Autowired
    CinemaRoomService cinemaRoomService;

    @GetMapping("/theater/{id}")
    public List<CinemaRoom> getCinemaRoomsByTheaterId(@PathVariable Long id) {
        return cinemaRoomService.getCinemaRoomsByTheaterId(id);
    }
}

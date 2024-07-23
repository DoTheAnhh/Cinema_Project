package com.example.cinema_project.serivce;

import com.example.cinema_project.entity.CinemaRoom;

import java.util.List;

public interface CinemaRoomService {
    List<CinemaRoom> getCinemaRoomsByTheaterId(Long id);
}

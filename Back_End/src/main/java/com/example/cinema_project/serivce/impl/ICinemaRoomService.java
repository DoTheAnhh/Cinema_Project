package com.example.cinema_project.serivce.impl;

import com.example.cinema_project.entity.CinemaRoom;
import com.example.cinema_project.repository.CinemaRoomRepository;
import com.example.cinema_project.serivce.CinemaRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ICinemaRoomService implements CinemaRoomService {

    @Autowired
    CinemaRoomRepository cinemaRoomRepository;

    @Override
    public List<CinemaRoom> getCinemaRoomsByTheaterId(Long id) {
        return cinemaRoomRepository.findByTheatersId(id);
    }
}

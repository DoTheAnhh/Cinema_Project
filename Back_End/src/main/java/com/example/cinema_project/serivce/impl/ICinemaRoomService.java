package com.example.cinema_project.serivce.impl;

import com.example.cinema_project.dto.CinemaRoomDTO;
import com.example.cinema_project.entity.CinemaRoom;
import com.example.cinema_project.entity.Theater;
import com.example.cinema_project.repository.CinemaRoomRepository;
import com.example.cinema_project.repository.TheaterRepository;
import com.example.cinema_project.serivce.CinemaRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ICinemaRoomService implements CinemaRoomService {

    @Autowired
    CinemaRoomRepository cinemaRoomRepository;

    @Autowired
    TheaterRepository theaterRepository;

    @Override
    public List<CinemaRoom> findAll() {
        return cinemaRoomRepository.findAll();
    }

    @Override
    public Optional<CinemaRoom> findById(Long id) {
        return cinemaRoomRepository.findById(id);
    }

    @Override
    public CinemaRoom insertCinemaRoom(CinemaRoomDTO cinemaRoomDTO) {
        CinemaRoom cinemaRoom = new CinemaRoom();
        cinemaRoom.setCinemaRoomName(cinemaRoomDTO.getCinemaRoomName());
        Long theaterId = cinemaRoomDTO.getTheater().getId();
        Theater theater = theaterRepository.findById(theaterId).orElse(null);
        if(theater != null){
            cinemaRoom.setTheaters(theater);
        }
        return cinemaRoomRepository.save(cinemaRoom);
    }

    @Override
    public CinemaRoom editCinemaRoom(Long id, CinemaRoomDTO cinemaRoomDTO) {
        Optional<CinemaRoom> cinemaRoomOptional = cinemaRoomRepository.findById(id);
        if(cinemaRoomOptional.isPresent()){
            CinemaRoom cinemaRoom = cinemaRoomOptional.get();
            cinemaRoom.setCinemaRoomName(cinemaRoomDTO.getCinemaRoomName());
            Long theaterId = cinemaRoomDTO.getTheater().getId();
            Theater theater = theaterRepository.findById(theaterId).orElse(null);
            if(theater != null){
                cinemaRoom.setTheaters(theater);
            }
            return cinemaRoomRepository.save(cinemaRoom);
        } else {
            throw new RuntimeException("Movie detail not found with id: " + id);
        }
    }
}

package com.example.cinema_project.serivce.impl;

import com.example.cinema_project.dto.Theater.TheaterDTO;
import com.example.cinema_project.entity.Theater;
import com.example.cinema_project.repository.TheaterRepository;
import com.example.cinema_project.serivce.TheaterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ITheaterService implements TheaterService {

    @Autowired
    TheaterRepository theaterRepository;

    @Override
    public List<Theater> findAll() {
        return theaterRepository.findAll();
    }

    @Override
    public Optional<Theater> findById(Long id) {
        return theaterRepository.findById(id);
    }

    @Override
    public Theater insert(TheaterDTO theaterDTO) {
        Theater theater = new Theater();
        theater.setTheaterName(theaterDTO.getTheaterName());
        theater.setProvince(theaterDTO.getProvince());
        theater.setLocation(theaterDTO.getLocation());
        return theaterRepository.save(theater);
    }

    @Override
    public Theater update(TheaterDTO theaterDTO, Long id) {
        Optional<Theater> theaterOptional = theaterRepository.findById(id);
        if (theaterOptional.isPresent()) {
            Theater theaterToEdit = theaterOptional.get();
            theaterToEdit.setTheaterName(theaterDTO.getTheaterName());
            theaterToEdit.setLocation(theaterDTO.getLocation());
            theaterToEdit.setProvince(theaterDTO.getProvince());
            return theaterRepository.save(theaterToEdit);
        } else {
            throw new RuntimeException("Theater not found with id: " + id);
        }
    }
}

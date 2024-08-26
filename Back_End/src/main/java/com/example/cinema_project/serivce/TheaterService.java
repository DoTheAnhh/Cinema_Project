package com.example.cinema_project.serivce;

import com.example.cinema_project.dto.Theater.TheaterDTO;
import com.example.cinema_project.entity.Theater;

import java.util.List;
import java.util.Optional;

public interface TheaterService {

    List<Theater> findAll();

    Optional<Theater> findById(Long id);

    Theater insert(TheaterDTO theaterDTO);

    Theater update(TheaterDTO theaterDTO, Long id);
}

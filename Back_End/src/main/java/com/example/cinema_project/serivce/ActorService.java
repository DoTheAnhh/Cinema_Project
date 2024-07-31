package com.example.cinema_project.serivce;

import com.example.cinema_project.dto.ActorDTO;
import com.example.cinema_project.dto.MovieTypeDTO;
import com.example.cinema_project.entity.Actor;
import com.example.cinema_project.entity.Movie;
import com.example.cinema_project.entity.MovieType;

import java.util.List;
import java.util.Optional;

public interface ActorService {
    List<Actor> findAll();

    Optional<Actor> findById(Long id);

    Actor insert (ActorDTO actorDTO);

    public Actor update(ActorDTO actorDTO, Long id);
}

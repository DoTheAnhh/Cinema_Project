package com.example.cinema_project.serivce;

import com.example.cinema_project.dto.MovieTypeDTO;
import com.example.cinema_project.entity.Movie;
import com.example.cinema_project.entity.MovieType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface MovieTypeService {
    List<MovieType> findAll();

    Optional<MovieType> findById(Long id);

    MovieType insert (MovieTypeDTO movieTypeDTO);

    MovieType update(Long id, MovieTypeDTO movieTypeDTO);
}

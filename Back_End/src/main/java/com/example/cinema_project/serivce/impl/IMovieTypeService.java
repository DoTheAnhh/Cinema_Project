package com.example.cinema_project.serivce.impl;

import com.example.cinema_project.dto.MovieTypeDTO;
import com.example.cinema_project.entity.MovieType;
import com.example.cinema_project.repository.MovieTypeRepository;
import com.example.cinema_project.serivce.MovieTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IMovieTypeService implements MovieTypeService {

    @Autowired
    MovieTypeRepository movieTypeRepository;

    @Override
    public List<MovieType> findAll() {
        return movieTypeRepository.findAll();
    }

    @Override
    public Optional<MovieType> findById(Long id) {
        return movieTypeRepository.findById(id);
    }

    @Override
    public MovieType insert(MovieTypeDTO movieTypeDTO) {
        MovieType movieType = new MovieType();
        movieType.setMovieTypeName(movieTypeDTO.getMovieTypeName());
        return movieTypeRepository.save(movieType);
    }

    @Override
    public MovieType update(Long id, MovieTypeDTO movieTypeDTO) {
        Optional<MovieType> movieTypeOptional = movieTypeRepository.findById(id);
        if (movieTypeOptional.isPresent()) {
            MovieType movieType = movieTypeOptional.get();
            movieType.setMovieTypeName(movieTypeDTO.getMovieTypeName());
            return movieTypeRepository.save(movieType);
        } else {
            throw new RuntimeException("Movie type not found with id: " + id);
        }
    }
}

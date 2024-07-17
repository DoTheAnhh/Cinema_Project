package com.example.cinema_project.serivce;

import com.example.cinema_project.entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

public interface MovieService {

    Page<Movie> findAll(Pageable pageable);

    Optional<Movie> findById(Long id);

    Movie add(Movie movie);

    Movie edit(Movie movie, Long id);

    void delete(Long id);

    Page<Movie> searchMovie(String movieName, String releaseDate, String[] movieType, Date startDate, Date endDate, int page, int size);
}

package com.example.cinema_project.serivce;

import com.example.cinema_project.dto.MovieDetailDTO;
import com.example.cinema_project.entity.MovieDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.sql.Date;
import java.util.Optional;

public interface MovieDetailService {

    Page<MovieDetail> findAll(Pageable pageable);

    Optional<MovieDetail> findById(Long id);

    MovieDetail add(MovieDetailDTO movieDetailDTO);

    MovieDetail edit(MovieDetailDTO movieDetailDTO, Long id);

    Page<MovieDetail> searchMovieDetail(String movieName, String directorName, Long[] actor , int page, int size);
}

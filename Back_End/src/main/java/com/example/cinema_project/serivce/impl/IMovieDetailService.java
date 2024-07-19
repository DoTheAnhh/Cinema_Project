package com.example.cinema_project.serivce.impl;

import com.example.cinema_project.dto.MovieDetailDTO;
import com.example.cinema_project.entity.Actor;
import com.example.cinema_project.entity.MovieDetail;
import com.example.cinema_project.repository.ActorRepository;
import com.example.cinema_project.repository.MovieDetailRepository;
import com.example.cinema_project.serivce.MovieDetailService;
import com.example.cinema_project.specification.MovieDetailSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class IMovieDetailService implements MovieDetailService {

    @Autowired
    MovieDetailRepository movieDetailRepository;

    @Autowired
    ActorRepository actorRepository;

    @Override
    public Page<MovieDetail> findAll(Pageable pageable) {
        return movieDetailRepository.findAll(pageable);
    }

    @Override
    public Optional<MovieDetail> findById(Long id) {
        return movieDetailRepository.findById(id);
    }

    @Override
    public MovieDetail add(MovieDetailDTO movieDetailDTO) {
        MovieDetail movieDetail = new MovieDetail();
        movieDetail.setTrailer(movieDetailDTO.getTrailer());
        movieDetail.setContent(movieDetailDTO.getContent());
        movieDetail.setDirectorName(movieDetailDTO.getDirectorName());
        movieDetail.setMovies(movieDetailDTO.getMovie());
        Set<Actor> actors = new HashSet<>();
        for (String actorId : movieDetailDTO.getActor()) {
            Actor existingActor = actorRepository.findById(Long.parseLong(actorId)).orElse(null);
            if (existingActor != null) {
                actors.add(existingActor);
            }
        }
        movieDetail.setActors(actors);

        return movieDetailRepository.save(movieDetail);
    }

    @Override
    public MovieDetail edit(MovieDetailDTO movieDetailDTO, Long id) {
        Optional<MovieDetail> movieDetailOptional = movieDetailRepository.findById(id);
        if(movieDetailOptional.isPresent()) {
            MovieDetail movieDetail = movieDetailOptional.get();
            movieDetail.setTrailer(movieDetailDTO.getTrailer());
            movieDetail.setContent(movieDetailDTO.getContent());
            movieDetail.setDirectorName(movieDetailDTO.getDirectorName());
            movieDetail.setMovies(movieDetailDTO.getMovie());

            Set<Actor> actors = new HashSet<>();
            for (String actorId : movieDetailDTO.getActor()) {
                Actor existingActor = actorRepository.findById(Long.parseLong(actorId)).orElse(null);
                if (existingActor != null) {
                    actors.add(existingActor);
                }
            }
            movieDetail.setActors(actors);
            return movieDetailRepository.save(movieDetail);
        }
        else {
            throw new RuntimeException("Movie detail not found with id: " + id);
        }
    }

    @Override
    public Page<MovieDetail> searchMovieDetail(Long movie, String directorName, Long[] actors, int page, int size) {
        Specification<MovieDetail> movieDetailSpecification = Specification.where(null);

        if (directorName != null && !directorName.trim().isEmpty()) {
            movieDetailSpecification = movieDetailSpecification.and(MovieDetailSpecification.hasDirectorName(directorName));
        }

        if (movie != null) {
            movieDetailSpecification = movieDetailSpecification.and(MovieDetailSpecification.hasMovie(movie));
        }

        if (actors != null && actors.length > 0) {
            movieDetailSpecification = movieDetailSpecification.and(MovieDetailSpecification.hasActors(actors));
        }

        Pageable pageable = PageRequest.of(page, size);
        return movieDetailRepository.findAll(movieDetailSpecification, pageable);
    }
}

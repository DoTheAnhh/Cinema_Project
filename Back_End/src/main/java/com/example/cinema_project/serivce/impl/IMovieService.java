package com.example.cinema_project.serivce.impl;

import com.example.cinema_project.dto.Movie.MovieDTO;
import com.example.cinema_project.entity.Actor;
import com.example.cinema_project.entity.Movie;
import com.example.cinema_project.entity.MovieType;
import com.example.cinema_project.repository.ActorRepository;
import com.example.cinema_project.repository.MovieRepository;
import com.example.cinema_project.repository.MovieTypeRepository;
import com.example.cinema_project.serivce.MovieService;
import com.example.cinema_project.specification.MovieSpecification;
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
public class IMovieService implements MovieService {

    @Autowired
    MovieRepository movieRepo;

    @Autowired
    ActorRepository actorRepository;

    @Autowired
    MovieTypeRepository movieTypeRepository;

    @Override
    public Page<Movie> findAll(Pageable pageable) {
        return movieRepo.findAll(pageable);
    }

    @Override
    public Optional<Movie> findById(Long id) {
        return movieRepo.findById(id);
    }

    @Override
    public Movie add(MovieDTO movieDTO) {
        Movie movie = new Movie();
        movie.setBanner(movieDTO.getBanner());
        movie.setMovieName(movieDTO.getMovieName());
        movie.setDuration(movieDTO.getDuration());
        movie.setReleaseDate(movieDTO.getReleaseDate());

        Set<MovieType> movieTypes = new HashSet<>();
        for (String typeId : movieDTO.getMovieTypes()) {
            MovieType existingType = movieTypeRepository.findById(Long.parseLong(typeId)).orElse(null);
            if (existingType != null) {
                movieTypes.add(existingType);
            }
        }

        movie.setTrailer(movieDTO.getTrailer());
        movie.setContent(movieDTO.getContent());
        movie.setTicketPrice(movieDTO.getTicketPrice());
        movie.setDirectorName(movieDTO.getDirectorName());

        Set<Actor> actors = new HashSet<>();
        for (String actorId : movieDTO.getActors()) {
            Actor existingActor = actorRepository.findById(Long.parseLong(actorId)).orElse(null);
            if (existingActor != null) {
                actors.add(existingActor);
            }
        }
        movie.setActors(actors);
        movie.setMovieTypes(movieTypes);

        return movieRepo.save(movie);
    }

    public Movie edit(MovieDTO movieDTO, Long id) {
        Optional<Movie> movieOptional = movieRepo.findById(id);
        if (movieOptional.isPresent()) {
            Movie movieToEdit = movieOptional.get();
            movieToEdit.setBanner(movieDTO.getBanner());
            movieToEdit.setMovieName(movieDTO.getMovieName());
            movieToEdit.setDuration(movieDTO.getDuration());
            movieToEdit.setReleaseDate(movieDTO.getReleaseDate());
            movieToEdit.setTicketPrice(movieDTO.getTicketPrice());

            Set<MovieType> movieTypes = new HashSet<>();
            for (String typeId : movieDTO.getMovieTypes()) {
                MovieType existingType = movieTypeRepository.findById(Long.parseLong(typeId)).orElse(null);
                if (existingType != null) {
                    movieTypes.add(existingType);
                }
            }
            movieToEdit.setMovieTypes(movieTypes);

            movieToEdit.setTrailer(movieDTO.getTrailer());
            movieToEdit.setContent(movieDTO.getContent());
            movieToEdit.setDirectorName(movieDTO.getDirectorName());

            Set<Actor> actors = new HashSet<>();
            for (String actorId : movieDTO.getActors()) {
                Actor existingActor = actorRepository.findById(Long.parseLong(actorId)).orElse(null);
                if (existingActor != null) {
                    actors.add(existingActor);
                }
            }
            movieToEdit.setActors(actors);

            return movieRepo.save(movieToEdit);
        } else {
            throw new RuntimeException("Movie not found with id: " + id);
        }
    }

    @Override
    public Page<Movie> searchMovie(String movieName, String releaseDate, Long[] movieType, Date startDate, Date endDate, int page, int size) {
        Specification<Movie> movieSpecification = Specification.where(null);

        if (movieName != null && !movieName.trim().isEmpty()) {
            movieSpecification = movieSpecification.and(MovieSpecification.hasName(movieName));
        }

        if (movieType != null && movieType.length > 0) {
            movieSpecification = movieSpecification.and(MovieSpecification.hasMovieType(movieType));
        }

        if (startDate != null && endDate != null) {
            movieSpecification = movieSpecification.and(MovieSpecification.hasReleaseDateBetween(startDate, endDate));
        }

        Pageable pageable = PageRequest.of(page, size);
        return movieRepo.findAll(movieSpecification, pageable);
    }
}

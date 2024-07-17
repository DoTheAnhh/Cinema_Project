package com.example.cinema_project.serivce.impl;

import com.example.cinema_project.entity.Movie;
import com.example.cinema_project.repository.MovieRepository;
import com.example.cinema_project.serivce.MovieService;
import com.example.cinema_project.specification.MovieSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IMovieService implements MovieService {

    @Autowired
    MovieRepository movieRepo;


    @Override
    public Page<Movie> findAll(Pageable pageable) {
        return movieRepo.findAll(pageable);
    }

    @Override
    public Optional<Movie> findById(Long id) {
        return movieRepo.findById(id);
    }

    @Override
    public Movie add(Movie movie) {
        return movieRepo.save(movie);
    }

    @Override
    public Movie edit(Movie movie, Long id) {
        Optional<Movie> movieOptional = movieRepo.findById(id);
        if(movieOptional.isPresent()) {
            Movie movieToEdit = movieOptional.get();

            movieToEdit.setBanner(movie.getBanner());
            movieToEdit.setMovieName(movie.getMovieName());
            movieToEdit.setDuration(movie.getDuration());
            movieToEdit.setReleaseDate(movie.getReleaseDate());
            movieToEdit.setMovieTypes(movie.getMovieTypes());
            return movieRepo.save(movieToEdit);
        } else {
            throw new RuntimeException("Movie not found with id: " + id);
        }
    }

    @Override
    public void delete(Long id) {
        movieRepo.deleteById(id);
    }

    @Override
    public Page<Movie> searchMovie(String movieName, String releaseDate, String[] movieType, int page, int size) {
        Specification<Movie> movieSpecification = Specification.where(null);

        if (movieName != null && !movieName.trim().isEmpty()) {
            movieSpecification = movieSpecification.and(MovieSpecification.hasName(movieName));
        }

        if (releaseDate != null && !releaseDate.trim().isEmpty()) {
            movieSpecification = movieSpecification.and(MovieSpecification.hasReleaseDate(releaseDate));
        }

        if (movieType != null && movieType.length > 0) {
            movieSpecification = movieSpecification.and(MovieSpecification.hasMovieType(movieType));
        }

        Pageable pageable = PageRequest.of(page, size);
        return movieRepo.findAll(movieSpecification, pageable);
    }

}

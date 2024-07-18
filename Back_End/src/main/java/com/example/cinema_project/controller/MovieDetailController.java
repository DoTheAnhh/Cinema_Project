package com.example.cinema_project.controller;
import com.example.cinema_project.dto.MovieDTO;
import com.example.cinema_project.dto.MovieDetailDTO;
import com.example.cinema_project.entity.Movie;
import com.example.cinema_project.entity.MovieDetail;
import com.example.cinema_project.serivce.MovieDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/movie-details")
public class MovieDetailController {

    @Autowired
    MovieDetailService movieDetailService;

    @GetMapping("")
    public Page<MovieDetail> getAllMovieDetails(Pageable pageable) {
        return movieDetailService.findAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieDetail> findById(@PathVariable Long id){
        Optional<MovieDetail> e = movieDetailService.findById(id);
        return e.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/insert-movie-detail")
    public ResponseEntity<MovieDetail> addMovieDetail(@RequestBody MovieDetailDTO movieDetailDTO) {
        return new ResponseEntity<>(movieDetailService.add(movieDetailDTO), HttpStatus.CREATED);
    }

    @PutMapping("/edit-movie-detail/{id}")
    public ResponseEntity<MovieDetail> editMovie(@PathVariable Long id, @RequestBody MovieDetailDTO movieDetailDTO) {
        try {
            return new ResponseEntity<>(movieDetailService.edit(movieDetailDTO, id), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}

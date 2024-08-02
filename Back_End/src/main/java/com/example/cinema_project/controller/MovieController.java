package com.example.cinema_project.controller;

import com.example.cinema_project.dto.MovieDTO;
import com.example.cinema_project.entity.Movie;
import com.example.cinema_project.serivce.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.text.Normalizer;
import java.util.Optional;
import java.util.regex.Pattern;

@CrossOrigin("*")
@RestController
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    MovieService movieService;

    @GetMapping()
    public Page<Movie> getAllMovie(@PageableDefault(size = 5) Pageable pageable) {
        return movieService.findAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> findById(@PathVariable Long id){
        Optional<Movie> e = movieService.findById(id);
        return e.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/insert-movie")
    public ResponseEntity<Movie> addMovie(@RequestBody MovieDTO movieDTO) {
        return new ResponseEntity<>(movieService.add(movieDTO), HttpStatus.CREATED);
    }

    @PutMapping("/edit-movie/{id}")
    public ResponseEntity<Movie> editMovie(@PathVariable Long id, @RequestBody MovieDTO movieDTO) {
        try {
            return new ResponseEntity<>(movieService.edit(movieDTO, id), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/search-movies")
    public ResponseEntity<Page<Movie>> searchMovie(
            @RequestParam(required = false) String movieName,
            @RequestParam(required = false) String releaseDate,
            @RequestParam(required = false) Long[] movieType,
            @RequestParam(required = false) Date fromDate,
            @RequestParam(required = false) Date toDate,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int size) {

        if (movieName != null) {
            movieName = removeVietnameseTones(movieName);
        }
        Page<Movie> moviePage = movieService.searchMovie(movieName, releaseDate, movieType, fromDate, toDate, page, size);
        return ResponseEntity.ok().body(moviePage);
    }

    private String removeVietnameseTones(String str) {
        str = Normalizer.normalize(str, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        str = pattern.matcher(str).replaceAll("");
        str = str.replaceAll("Đ", "D");
        str = str.replaceAll("đ", "d");
        return str;
    }
}

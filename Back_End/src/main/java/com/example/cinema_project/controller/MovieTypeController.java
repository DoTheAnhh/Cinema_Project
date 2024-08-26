package com.example.cinema_project.controller;

import com.example.cinema_project.dto.MovieType.MovieTypeDTO;
import com.example.cinema_project.entity.MovieType;
import com.example.cinema_project.serivce.MovieTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/movie-types")
public class MovieTypeController {
 
    @Autowired
    MovieTypeService movieTypeService;

    @GetMapping("")
    public List<MovieType> getAllMovieType(){
        return movieTypeService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<MovieType> getById(@PathVariable Long id) {
        return movieTypeService.findById(id);
    }

    @PostMapping("/insert-movie-type")
    public ResponseEntity<MovieType> addMovie(@RequestBody MovieTypeDTO movieTypeDTO) {
        return new ResponseEntity<>(movieTypeService.insert(movieTypeDTO), HttpStatus.CREATED);
    }

    @PutMapping("/edit-movie-type/{id}")
    public ResponseEntity<MovieType> editMovie(@PathVariable Long id, @RequestBody MovieTypeDTO movieTypeDTO) {
        try {
            return new ResponseEntity<>(movieTypeService.update(id, movieTypeDTO), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

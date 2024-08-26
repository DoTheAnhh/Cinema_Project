package com.example.cinema_project.controller;

import com.example.cinema_project.dto.Theater.TheaterDTO;
import com.example.cinema_project.entity.Theater;
import com.example.cinema_project.serivce.TheaterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/theaters")
public class TheaterController {

    @Autowired
    TheaterService theaterService;

    @GetMapping("")
    public List<Theater> findAll(){
        return theaterService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Theater> findById(@PathVariable Long id){
        Optional<Theater> e = theaterService.findById(id);
        return e.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/insert-theater")
    public ResponseEntity<Theater> addMovie(@RequestBody TheaterDTO theaterDTO) {
        return new ResponseEntity<>(theaterService.insert(theaterDTO), HttpStatus.CREATED);
    }

    @PutMapping("/edit-theater/{id}")
    public ResponseEntity<Theater> editMovie(@PathVariable Long id, @RequestBody TheaterDTO theaterDTO) {
        try {
            return new ResponseEntity<>(theaterService.update(theaterDTO, id), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

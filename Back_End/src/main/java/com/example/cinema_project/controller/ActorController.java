package com.example.cinema_project.controller;

import com.example.cinema_project.dto.Actor.ActorDTO;
import com.example.cinema_project.entity.Actor;
import com.example.cinema_project.serivce.ActorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/actors")
public class ActorController {

    @Autowired
    ActorService actorService;

    @GetMapping("")
    public List<Actor> getAllActors() {
        return actorService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Actor> getById(@PathVariable Long id) {
        return actorService.findById(id);
    }

    @PostMapping("/insert-actor")
    public ResponseEntity<Actor> addMovie(@RequestBody ActorDTO actorDTO) {
        return new ResponseEntity<>(actorService.insert(actorDTO), HttpStatus.CREATED);
    }

    @PutMapping("/edit-actor/{id}")
    public ResponseEntity<Actor> editMovie(@PathVariable Long id, @RequestBody ActorDTO actorDTO) {
        try {
            return new ResponseEntity<>(actorService.update(actorDTO, id), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

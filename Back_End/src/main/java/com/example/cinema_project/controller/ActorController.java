package com.example.cinema_project.controller;

import com.example.cinema_project.entity.Actor;
import com.example.cinema_project.serivce.ActorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}

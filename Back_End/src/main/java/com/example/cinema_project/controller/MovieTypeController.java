package com.example.cinema_project.controller;

import com.example.cinema_project.entity.MovieType;
import com.example.cinema_project.serivce.MovieTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/movie-types")
public class MovieTypeController {
 
    @Autowired
    MovieTypeService movieTypeService;

    @GetMapping("")
    public List<MovieType> getAll(){
        return movieTypeService.findAll();
    }
}

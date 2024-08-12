package com.example.cinema_project.controller;

import com.example.cinema_project.dto.FoodDTO;
import com.example.cinema_project.dto.MovieTypeDTO;
import com.example.cinema_project.entity.Food;
import com.example.cinema_project.entity.MovieType;
import com.example.cinema_project.repository.SeatRepository;
import com.example.cinema_project.serivce.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/foods")
public class FoodController {

    @Autowired
    FoodService foodService;

    @GetMapping("")
    public List<Food> getAllFoods() {
        return foodService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Food> getFoodById(Long id) {
        return foodService.findById(id);
    }

    @PostMapping("/insert-food")
    public ResponseEntity<Food> addMovie(@RequestBody FoodDTO foodDTO) {
        return new ResponseEntity<>(foodService.insert(foodDTO), HttpStatus.CREATED);
    }

    @PutMapping("/edit-food/{id}")
    public ResponseEntity<Food> editMovie(@PathVariable Long id, @RequestBody FoodDTO foodDTO) {
        try {
            return new ResponseEntity<>(foodService.update(id, foodDTO), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

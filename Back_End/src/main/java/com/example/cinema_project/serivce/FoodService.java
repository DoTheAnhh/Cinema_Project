package com.example.cinema_project.serivce;

import com.example.cinema_project.dto.FoodDTO;
import com.example.cinema_project.dto.MovieTypeDTO;
import com.example.cinema_project.entity.Food;
import com.example.cinema_project.entity.MovieType;

import java.util.List;
import java.util.Optional;

public interface FoodService {

    List<Food> findAll();

    Optional<Food> findById(Long id);

    Food insert (FoodDTO foodDTO);

    Food update(Long id, FoodDTO foodDTO);
}

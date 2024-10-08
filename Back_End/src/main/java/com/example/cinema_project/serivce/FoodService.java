package com.example.cinema_project.serivce;

import com.example.cinema_project.dto.Food.FoodDTO;
import com.example.cinema_project.entity.Food;

import java.util.List;
import java.util.Optional;

public interface FoodService {

    List<Food> findAll();

    Optional<Food> findById(Long id);

    Food insert (FoodDTO foodDTO);

    Food update(Long id, FoodDTO foodDTO);

    Food updateQuantity(Long id, FoodDTO foodDTO);
}

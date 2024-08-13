package com.example.cinema_project.serivce.impl;

import com.example.cinema_project.dto.FoodDTO;
import com.example.cinema_project.entity.Food;
import com.example.cinema_project.repository.FoodRepository;
import com.example.cinema_project.serivce.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IFoodService implements FoodService{

    @Autowired
    FoodRepository foodRepository;

    @Override
    public List<Food> findAll() {
        return foodRepository.findAll();
    }

    @Override
    public Optional<Food> findById(Long id) {
        return foodRepository.findById(id);
    }

    @Override
    public Food insert(FoodDTO foodDTO) {
        Food food = new Food();
        food.setFoodName(foodDTO.getFoodName());
        food.setPrice(foodDTO.getPrice());
        food.setQuantity(foodDTO.getQuantity());
        food.setImage(foodDTO.getImage());
        return foodRepository.save(food);
    }

    @Override
    public Food update(Long id, FoodDTO foodDTO) {
        Optional<Food> foodOptional = foodRepository.findById(id);
        if (foodOptional.isPresent()) {
            Food food = foodOptional.get();
            food.setFoodName(foodDTO.getFoodName());
            food.setPrice(foodDTO.getPrice());
            food.setQuantity(foodDTO.getQuantity());
            food.setImage(foodDTO.getImage());
            return foodRepository.save(food);
        } else {
            throw new RuntimeException("Food not found with id: " + id);
        }
    }
}

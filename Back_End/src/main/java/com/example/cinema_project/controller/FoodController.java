package com.example.cinema_project.controller;

import com.example.cinema_project.dto.Food.FoodDTO;
import com.example.cinema_project.entity.Food;
import com.example.cinema_project.serivce.FoodService;
import com.example.cinema_project.serivce.impl.IFoodService;
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

    @PutMapping("/update-quantity-food/{id}")
    public ResponseEntity<Food> updateQuantityFood(@PathVariable Long id, @RequestBody FoodDTO foodDTO) {
        try {
            // Cập nhật số lượng thực phẩm và trả về đối tượng đã cập nhật
            Food updatedFood = foodService.updateQuantity(id, foodDTO);
            return new ResponseEntity<>(updatedFood, HttpStatus.OK);
        } catch (IFoodService.ResourceNotFoundException e) {
            // Xử lý trường hợp không tìm thấy thực phẩm
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (IllegalArgumentException e) {
            // Xử lý trường hợp số lượng không hợp lệ
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            // Xử lý các lỗi khác
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

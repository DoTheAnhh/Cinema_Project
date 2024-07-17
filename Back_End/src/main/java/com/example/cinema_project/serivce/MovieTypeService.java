package com.example.cinema_project.serivce;

import com.example.cinema_project.entity.MovieType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MovieTypeService {
    List<MovieType> findAll();
}

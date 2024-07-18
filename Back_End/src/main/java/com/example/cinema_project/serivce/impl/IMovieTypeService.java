package com.example.cinema_project.serivce.impl;

import com.example.cinema_project.entity.MovieType;
import com.example.cinema_project.repository.MovieTypeRepository;
import com.example.cinema_project.serivce.MovieTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IMovieTypeService implements MovieTypeService {

    @Autowired
    MovieTypeRepository movieTypeRepository;

    @Override
    public List<MovieType> findAll() {
        return movieTypeRepository.findAll();
    }
}

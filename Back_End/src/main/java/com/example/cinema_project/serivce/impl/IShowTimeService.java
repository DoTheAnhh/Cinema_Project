package com.example.cinema_project.serivce.impl;

import com.example.cinema_project.entity.ShowTime;
import com.example.cinema_project.repository.ShowTimeRepository;
import com.example.cinema_project.serivce.ShowTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class IShowTimeService implements ShowTimeService {

    @Autowired
    ShowTimeRepository showTimeRepository;

    @Override
    public List<ShowTime> getShowTimesByMovieIdAndShowDateAndShowTime(Long movieId, Date showDate) {
        return showTimeRepository.findByMovieIdAndShowDate(movieId, showDate);
    }
}

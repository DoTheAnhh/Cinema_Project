package com.example.cinema_project.serivce;

import com.example.cinema_project.entity.ShowTime;

import java.sql.Date;
import java.util.List;

public interface ShowTimeService {

    List<ShowTime> getShowTimesByMovieIdAndShowDateAndShowTime(Long movieId, Date showDate);
}

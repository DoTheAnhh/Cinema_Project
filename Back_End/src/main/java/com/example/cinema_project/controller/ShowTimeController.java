package com.example.cinema_project.controller;

import com.example.cinema_project.entity.ShowTime;
import com.example.cinema_project.serivce.ShowTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/show-times")
public class ShowTimeController {

    @Autowired
    private ShowTimeService showTimeService;

    @GetMapping("/movie/{movieId}/date/{showDate}")
    public List<ShowTime> getShowTime(
            @PathVariable Long movieId,
            @PathVariable String showDate
    ) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date parsedDate = dateFormat.parse(showDate);
        Date sqlDate = new Date(parsedDate.getTime());

        return showTimeService.getShowTimesByMovieIdAndShowDate(movieId, sqlDate);
    }
}

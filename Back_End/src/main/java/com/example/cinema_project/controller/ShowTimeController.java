package com.example.cinema_project.controller;

import com.example.cinema_project.dto.ShowTimeDTO;
import com.example.cinema_project.entity.ShowTime;
import com.example.cinema_project.serivce.SeatService;
import com.example.cinema_project.serivce.ShowTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/show-times")
public class ShowTimeController {

    @Autowired
    ShowTimeService showTimeService;

    @Autowired
    SeatService seatService;

    @GetMapping("/movie/{movieId}/date/{showDate}")
    public List<ShowTime> getShowTimeByMovieIdAndShowDate(
            @PathVariable Long movieId,
            @PathVariable String showDate
    ) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date parsedDate = dateFormat.parse(showDate);
        Date sqlDate = new Date(parsedDate.getTime());

        return showTimeService.getShowTimesByMovieIdAndShowDate(movieId, sqlDate);
    }

    @GetMapping("")
    public Page<ShowTime> findAll(@PageableDefault(size = 5)  Pageable pageable) {
        return showTimeService.findAllShowTime(pageable);
    }

    @GetMapping("/{id}")
    public Optional<ShowTime> getCinemaRoomsById(@PathVariable Long id) {
        return showTimeService.findByIdShowTime(id);
    }

    @PostMapping("/insert-show-time")
    public ResponseEntity<ShowTime> addMovie(@RequestBody ShowTimeDTO showTimeDTO) {
        return new ResponseEntity<>(showTimeService.insertShowTime(showTimeDTO), HttpStatus.CREATED);
    }

    @PutMapping("/edit-show-time/{id}")
    public ResponseEntity<ShowTime> editMovie(@PathVariable Long id, @RequestBody ShowTimeDTO showTimeDTO) {
        try {
            return new ResponseEntity<>(showTimeService.editShowTime(id, showTimeDTO ), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

package com.example.cinema_project.dto;

import com.example.cinema_project.entity.CinemaRoom;
import com.example.cinema_project.entity.Movie;
import com.example.cinema_project.entity.Theater;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class ShowTimeDTO {

    private CinemaRoom cinemaRoom;

    private Movie movie;

    private Date showDate;

    private String showTime;

    private String showTimeEnd;

}

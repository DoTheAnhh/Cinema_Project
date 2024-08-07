package com.example.cinema_project.dto;

import com.example.cinema_project.entity.CinemaRoom;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SeatDTO {

    private Long id;

    private String rowNumber;

    private int seatNumber;

    private String seatType;

    private String status;

    private CinemaRoom cinemaRoom;
}

package com.example.cinema_project.dto;

import com.example.cinema_project.entity.Theater;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SeatCinemaRoomDTO {

    private Long id;

    private String rowNumber;

    private int seatNumber;

    private String seatType;

    private String cinemaRoomName;

    private Theater theaters;

    private String status;
}

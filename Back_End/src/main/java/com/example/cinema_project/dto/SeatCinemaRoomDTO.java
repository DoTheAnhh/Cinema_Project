package com.example.cinema_project.dto;

import com.example.cinema_project.entity.CinemaRoom;
import com.example.cinema_project.entity.Seat;
import com.example.cinema_project.entity.Theater;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

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

    private List<Long> seats;

    private Long cinemaRoom;
}

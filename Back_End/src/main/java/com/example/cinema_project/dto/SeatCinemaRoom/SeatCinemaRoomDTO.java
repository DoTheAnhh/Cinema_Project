package com.example.cinema_project.dto.SeatCinemaRoom;

import com.example.cinema_project.entity.Theater;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

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

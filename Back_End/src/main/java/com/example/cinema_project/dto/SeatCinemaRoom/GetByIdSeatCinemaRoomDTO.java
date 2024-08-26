package com.example.cinema_project.dto.SeatCinemaRoom;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GetByIdSeatCinemaRoomDTO {
    private String status;

    private List<Long> seats;

    private String rowNumber;

    private int seatNumber;

    private Long cinemaRoomId;

    private String cinemaRoomName;
}

package com.example.cinema_project.dto.Seat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SeatDTO {

    private String rowNumber;
    private int seatNumber;
    private String seatType;
    private Long seatId;
    private Long cinemaRoomId;
    private String showTime;
    private String status;

    public SeatDTO(String rowNumber, int seatNumber, String seatType, Long seatId, Long cinemaRoomId, String showTime, String status) {
        this.rowNumber = rowNumber;
        this.seatNumber = seatNumber;
        this.seatType = seatType;
        this.seatId = seatId;
        this.cinemaRoomId = cinemaRoomId;
        this.showTime = showTime;
        this.status = status;
    }
}

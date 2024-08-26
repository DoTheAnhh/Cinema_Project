package com.example.cinema_project.dto.Seat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SeatStatusDTO {
    private String status;
    private String rowNumber;
    private int seatNumber;

    public SeatStatusDTO(String status, String rowNumber, int seatNumber) {
        this.status = status;
        this.rowNumber = rowNumber;
        this.seatNumber = seatNumber;
    }
}

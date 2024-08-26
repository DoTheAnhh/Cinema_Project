package com.example.cinema_project.dto.Seat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.GetMapping;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SeatDTOGetAllInSeatCinemaRoom {
    private String rowNumber;
    private int seatNumber;
    private String seatType;
    private Long seatId;

    public SeatDTOGetAllInSeatCinemaRoom(String seatType, Long seatId, int seatNumber, String rowNumber) {
        this.seatType = seatType;
        this.seatId = seatId;
        this.seatNumber = seatNumber;
        this.rowNumber = rowNumber;
    }
}

package com.example.cinema_project.dto.Seat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CheckSeatStatusResDTO {
    private Long seatId;
    private String status;
}

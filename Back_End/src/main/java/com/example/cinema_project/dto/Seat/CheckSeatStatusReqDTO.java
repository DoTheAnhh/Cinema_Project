package com.example.cinema_project.dto.Seat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CheckSeatStatusReqDTO {
    private Long cinemaRoomId;
    private List<Long> seatIds;
}

package com.example.cinema_project.dto;

import com.example.cinema_project.entity.Theater;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CinemaRoomDTO {

    private Long id;

    private String cinemaRoomName;

    private Theater theater;
}

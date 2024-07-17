package com.example.cinema_project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MovieDTO {

    private String id;

    private String banner;

    private String movieName;

    private String duration;

    private Date releaseDate;

    private Set<String> movieType;
}

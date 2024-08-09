package com.example.cinema_project.dto;

import com.example.cinema_project.entity.Movie;
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

    public String directorName;

    public String trailer;

    public Date movieDate;

    public String content;

    public String ticketPrice;

    private Set<String> movieTypes;

    public Set<String> actors;
}

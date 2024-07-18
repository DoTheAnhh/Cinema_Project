package com.example.cinema_project.dto;

import com.example.cinema_project.entity.Movie;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MovieDetailDTO {

    public Movie movie;

    public Set<String> actor;

    public String directorName;

    public String trailer;

    public Date movieDate;

    public String content;
}

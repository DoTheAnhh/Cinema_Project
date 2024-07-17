package com.example.cinema_project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "movie")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String banner;

    private String movieName;

    private String duration;

    private Date releaseDate;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "movie_movie_type",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "movie_type_id")
    )
    private Set<MovieType> movieTypes = new HashSet<>();
}

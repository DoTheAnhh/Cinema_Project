package com.example.cinema_project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "movie_detail")
public class MovieDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie;

    private String directorName;

    @ManyToOne
    @JoinColumn(name = "actor_id")
    private Actor actor;

    private String trailer;

    private Date movieDate;

    private String content;
}

package com.example.cinema_project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "seat")
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int rowNumber; //Số hàng của ghế

    private int seatNumber; //Số ghế trong hàng

    private String seatType;

    private boolean status;

    @ManyToOne
    @JoinColumn(name = "cinemaRoom_id")
    private CinemaRoom cinemaRoom;
}

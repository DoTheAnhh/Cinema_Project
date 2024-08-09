package com.example.cinema_project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "cinema_room")
public class CinemaRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cinemaRoomName;

    @ManyToOne
    @JoinColumn(name = "theater_id")
    private Theater theaters;


    @OneToMany(mappedBy = "cinemaRoom", fetch = FetchType.LAZY)
    private Set<Seat_Cinema_Room> seatCinemaRooms;

    @OneToMany(mappedBy = "cinemaRoom", fetch = FetchType.LAZY)
    private Set<ShowTime> showTimes;
}

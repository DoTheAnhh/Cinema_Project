package com.example.cinema_project.repository;

import com.example.cinema_project.entity.Seat_Cinema_Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Seat_CinemaRoomRepository extends JpaRepository<Seat_Cinema_Room, Long> {
}





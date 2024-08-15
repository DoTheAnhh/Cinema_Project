package com.example.cinema_project.repository;

import com.example.cinema_project.entity.Seat;
import com.example.cinema_project.entity.Seat_Cinema_Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Seat_CinemaRoomRepository extends JpaRepository<Seat_Cinema_Room, Long> {

    @Query("SELECT s FROM Seat_Cinema_Room s WHERE s.status = 'pending'")
    List<Seat_Cinema_Room> findPendingSeats();

    List<Seat_Cinema_Room> findByCinemaRoomId(Long cinemaRoomId);
}





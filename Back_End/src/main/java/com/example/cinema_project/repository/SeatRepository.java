package com.example.cinema_project.repository;

import com.example.cinema_project.dto.SeatDTO;
import com.example.cinema_project.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {

    @Query("SELECT new com.example.cinema_project.dto.SeatDTO(s.rowNumber, s.seatNumber, s.seatType, s.id, scr.cinemaRoom.id, st.showTime, scr.status) " +
            "FROM Seat s " +
            "JOIN Seat_Cinema_Room scr ON s.id = scr.seat.id " +
            "JOIN CinemaRoom cr ON cr.id = scr.cinemaRoom.id " +
            "JOIN ShowTime st ON st.cinemaRoom.id = cr.id " +
            "WHERE scr.cinemaRoom.id = :cinemaRoomId " +
            "AND st.showTime = :showTime")
    List<SeatDTO> findSeatCinemaRoomsByCinemaRoomIdAndShowTime(@Param("cinemaRoomId") Long cinemaRoomId,
                                                               @Param("showTime") String showTime);
}



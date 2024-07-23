package com.example.cinema_project.repository;

import com.example.cinema_project.entity.CinemaRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CinemaRoomRepository extends JpaRepository<CinemaRoom, Long> {
    List<CinemaRoom> findByTheatersId(Long theaterId);
}

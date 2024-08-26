package com.example.cinema_project.serivce.impl;

import com.example.cinema_project.dto.SeatCinemaRoomDTO;
import com.example.cinema_project.entity.Seat;
import com.example.cinema_project.entity.Seat_Cinema_Room;
import com.example.cinema_project.repository.Seat_CinemaRoomRepository;
import com.example.cinema_project.serivce.Seat_Cinema_RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class ISeat_Cinema_RoomService implements Seat_Cinema_RoomService {

    @Autowired
    Seat_CinemaRoomRepository seatCinemaRoomRepository;

    @Override
    public List<SeatCinemaRoomDTO> findAll() {
        List<Seat_Cinema_Room> seatCinemaRoomPage = seatCinemaRoomRepository.findAll();
        List<SeatCinemaRoomDTO> dtos = new ArrayList<>();

        for (Seat_Cinema_Room seatCinemaRoom : seatCinemaRoomPage) {
            SeatCinemaRoomDTO dto = new SeatCinemaRoomDTO();
            dto.setRowNumber(seatCinemaRoom.getSeat().getRowNumber());
            dto.setSeatNumber(seatCinemaRoom.getSeat().getSeatNumber());
            dto.setSeatType(seatCinemaRoom.getSeat().getSeatType());
            dto.setCinemaRoomName(seatCinemaRoom.getCinemaRoom().getCinemaRoomName());
            dto.setTheaters(seatCinemaRoom.getCinemaRoom().getTheaters());
            dto.setStatus(seatCinemaRoom.getStatus());

            dtos.add(dto);
        }

        return dtos;
    }

    @Override
    public void checkAndMakeSeatsAvailable() {
        LocalDateTime now = LocalDateTime.now();

        Date formattedDate = java.sql.Date.valueOf(now.toLocalDate());

        String currentTime = now.toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm"));

        List<Long> bookedSeatIds = seatCinemaRoomRepository.findSeatsToBeAvailable(formattedDate, currentTime);

        if (!bookedSeatIds.isEmpty()) {
            for (Long seatId : bookedSeatIds) {
                Seat_Cinema_Room seatCinemaRoom = seatCinemaRoomRepository.findById(seatId).orElse(null);
                if (seatCinemaRoom != null) {
                    seatCinemaRoom.setStatus("available");
                    seatCinemaRoomRepository.save(seatCinemaRoom);
                }
            }
        }
    }
}

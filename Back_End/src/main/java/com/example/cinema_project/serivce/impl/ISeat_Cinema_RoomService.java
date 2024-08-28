package com.example.cinema_project.serivce.impl;

import com.example.cinema_project.dto.SeatCinemaRoom.GetByIdSeatCinemaRoomDTO;
import com.example.cinema_project.dto.SeatCinemaRoom.SeatCinemaRoomDTO;
import com.example.cinema_project.entity.CinemaRoom;
import com.example.cinema_project.entity.MovieType;
import com.example.cinema_project.entity.Seat;
import com.example.cinema_project.entity.Seat_Cinema_Room;
import com.example.cinema_project.repository.CinemaRoomRepository;
import com.example.cinema_project.repository.SeatRepository;
import com.example.cinema_project.repository.Seat_CinemaRoomRepository;
import com.example.cinema_project.serivce.Seat_Cinema_RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class ISeat_Cinema_RoomService implements Seat_Cinema_RoomService {

    @Autowired
    Seat_CinemaRoomRepository seatCinemaRoomRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private CinemaRoomRepository cinemaRoomRepository;

    @Override
    public Page<SeatCinemaRoomDTO> findAll(Pageable pageable) {
        Page<Seat_Cinema_Room> seatCinemaRoomPage = seatCinemaRoomRepository.findAll(pageable);
        List<SeatCinemaRoomDTO> dtos = new ArrayList<>();

        for (Seat_Cinema_Room seatCinemaRoom : seatCinemaRoomPage) {
            SeatCinemaRoomDTO dto = new SeatCinemaRoomDTO();
            dto.setId(seatCinemaRoom.getId());
            dto.setRowNumber(seatCinemaRoom.getSeat().getRowNumber());
            dto.setSeatNumber(seatCinemaRoom.getSeat().getSeatNumber());
            dto.setSeatType(seatCinemaRoom.getSeat().getSeatType());
            dto.setCinemaRoomName(seatCinemaRoom.getCinemaRoom().getCinemaRoomName());
            dto.setTheaters(seatCinemaRoom.getCinemaRoom().getTheaters());
            dto.setStatus(seatCinemaRoom.getStatus());

            dtos.add(dto);
        }

        return new PageImpl<>(dtos, pageable, seatCinemaRoomPage.getTotalElements());
    }

    @Override
    public List<Seat_Cinema_Room> insertSeatCinemaRoom(SeatCinemaRoomDTO seatCinemaRoomDTO) {
        List<Seat_Cinema_Room> seatCinemaRooms = new ArrayList<>();

        CinemaRoom cinemaRoom = cinemaRoomRepository.findById(seatCinemaRoomDTO.getCinemaRoom())
                .orElseThrow(() -> new RuntimeException("Cinema room not found: " + seatCinemaRoomDTO.getCinemaRoom()));

        for (Long seatId : seatCinemaRoomDTO.getSeats()) {
            Seat seat = seatRepository.findById(seatId)
                    .orElseThrow(() -> new RuntimeException("Seat not found: " + seatId));

            Seat_Cinema_Room seatCinemaRoom = new Seat_Cinema_Room();
            seatCinemaRoom.setSeat(seat);
            seatCinemaRoom.setCinemaRoom(cinemaRoom);
            seatCinemaRoom.setStatus(seatCinemaRoomDTO.getStatus());

            seatCinemaRooms.add(seatCinemaRoom);
        }

        return seatCinemaRoomRepository.saveAll(seatCinemaRooms);
    }

    @Override
    public List<Seat_Cinema_Room> editSeatCinemaRoom(SeatCinemaRoomDTO seatCinemaRoomDTO, Long id) {
        CinemaRoom cinemaRoom = cinemaRoomRepository.findById(seatCinemaRoomDTO.getCinemaRoom())
                .orElseThrow(() -> new RuntimeException("Cinema room not found: " + seatCinemaRoomDTO.getCinemaRoom()));

        List<Seat_Cinema_Room> updatedSeatCinemaRooms = new ArrayList<>();

        for (Long seatId : seatCinemaRoomDTO.getSeats()) {
            Seat seat = seatRepository.findById(seatId)
                    .orElseThrow(() -> new RuntimeException("Seat not found: " + seatId));

            Seat_Cinema_Room seatCinemaRoom = seatCinemaRoomRepository.findBySeatAndCinemaRoom(seat, cinemaRoom)
                    .orElse(new Seat_Cinema_Room());

            seatCinemaRoom.setCinemaRoom(cinemaRoom);
            seatCinemaRoom.setSeat(seat);
            seatCinemaRoom.setStatus(seatCinemaRoomDTO.getStatus());

            updatedSeatCinemaRooms.add(seatCinemaRoom);
        }

        return seatCinemaRoomRepository.saveAll(updatedSeatCinemaRooms);
    }

    @Override
    public Optional<GetByIdSeatCinemaRoomDTO> getSeatCinemaRoomById(Long id) {
        Optional<Seat_Cinema_Room> seatCinemaRoomOptional = seatCinemaRoomRepository.findById(id);

        return seatCinemaRoomOptional.map(seatCinemaRoom -> {
            GetByIdSeatCinemaRoomDTO dto = new GetByIdSeatCinemaRoomDTO();
            dto.setStatus(seatCinemaRoom.getStatus());
            Long seatId = seatCinemaRoom.getSeat().getId();
            dto.setSeats(Arrays.asList(seatId));
            dto.setCinemaRoomId(seatCinemaRoom.getCinemaRoom().getId());
            dto.setCinemaRoomName(seatCinemaRoom.getCinemaRoom().getCinemaRoomName());
            dto.setSeatNumber(seatCinemaRoom.getSeat().getSeatNumber());
            dto.setRowNumber(seatCinemaRoom.getSeat().getRowNumber());
            return dto;
        });
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

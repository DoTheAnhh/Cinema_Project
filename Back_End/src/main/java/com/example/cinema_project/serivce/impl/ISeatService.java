package com.example.cinema_project.serivce.impl;

import com.example.cinema_project.dto.CheckSeatStatusResTO;
import com.example.cinema_project.dto.SeatDTO;
import com.example.cinema_project.dto.SeatStatusDTO;
import com.example.cinema_project.entity.Seat_Cinema_Room;
import com.example.cinema_project.repository.SeatRepository;
import com.example.cinema_project.repository.Seat_CinemaRoomRepository;
import com.example.cinema_project.serivce.SeatService;
import com.example.cinema_project.serivce.Seat_Cinema_RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ISeatService implements SeatService {

    @Autowired
    SeatRepository seatRepository;

    @Autowired
    Seat_CinemaRoomRepository seatCinemaRoomRepository;

    @Override
    public List<SeatDTO> findSeatCinemaRoomsByCinemaRoomIdAndShowTime(Long cinemaRoomId, String showTime) {
        return seatRepository.findSeatCinemaRoomsByCinemaRoomIdAndShowTime(cinemaRoomId, showTime);
    }

    @Override
    public void updateStatus(Long cinemaRoomId, Long seatId, String status) {
        seatRepository.updateStatus(status, cinemaRoomId, seatId);
    }

    @Override
    public SeatStatusDTO getSeatStatus(Long cinemaRoomId, Long seatId) {
        return seatRepository.findStatusByCinemaRoomIdAndSeatId(cinemaRoomId, seatId);
    }

    @Override
    public List<CheckSeatStatusResTO> checkSeatStatus(Long cinemaRoomId, List<Long> seatIds) {
        // Tìm các ghế theo cinemaRoomId và seatIds
        List<Seat_Cinema_Room> seats = seatCinemaRoomRepository.findByCinemaRoomIdAndSeatIdIn(cinemaRoomId, seatIds);

        // Chuyển đổi kết quả thành danh sách SeatStatusResponse
        return seats.stream()
                .map(seat -> new CheckSeatStatusResTO(seat.getId(), seat.getStatus()))
                .collect(Collectors.toList());
    }
}

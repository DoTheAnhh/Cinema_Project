package com.example.cinema_project.config.schedule;

import com.example.cinema_project.entity.Seat_Cinema_Room;
import com.example.cinema_project.entity.ShowTime;
import com.example.cinema_project.repository.SeatRepository;
import com.example.cinema_project.repository.Seat_CinemaRoomRepository;
import com.example.cinema_project.repository.ShowTimeRepository;
import com.example.cinema_project.serivce.Seat_Cinema_RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class ScheduledTasks {

    @Autowired
    private ShowTimeRepository showTimeRepository;
    @Autowired
    private Seat_CinemaRoomRepository seatCinemaRoomRepository;
    @Autowired
    private Seat_Cinema_RoomService seatCinemaRoomService;
    @Autowired
    SeatRepository seatRepository;

    // Scheduled to run every day at midnight
    @Scheduled(cron = "0 0 0 * * *")
    public void deleteOldShowTimes() {
        LocalDate today = LocalDate.now();
        List<ShowTime> oldShowTimes = showTimeRepository.findByShowDateBefore(today);
        if (!oldShowTimes.isEmpty()) {
            showTimeRepository.deleteAll(oldShowTimes);
            System.out.println("Deleted " + oldShowTimes.size() + " old show times.");
        }
    }

    @Scheduled(fixedRate = 420000) // 7 phút
    public void updatePendingSeats() {
        List<Seat_Cinema_Room> pendingSeats = seatCinemaRoomRepository.findPendingSeats();

        for (Seat_Cinema_Room seat : pendingSeats) {
            seat.setStatus("available");
        }
        seatCinemaRoomRepository.saveAll(pendingSeats);
    }

    @Scheduled(cron = "*/30 * * * * *")
    public void checkAndUpdateSeatStatus() {
        seatCinemaRoomService.checkAndMakeSeatsAvailable();
    }
}

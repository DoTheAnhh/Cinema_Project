package com.example.cinema_project.config.schedule;

import com.example.cinema_project.entity.ShowTime;
import com.example.cinema_project.repository.ShowTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class ScheduledTasks {

    @Autowired
    private ShowTimeRepository showTimeRepository;

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
}

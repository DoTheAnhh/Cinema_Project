package com.example.cinema_project.serivce.impl;

import com.example.cinema_project.dto.ShowTimeDTO;
import com.example.cinema_project.entity.CinemaRoom;
import com.example.cinema_project.entity.ShowTime;
import com.example.cinema_project.entity.Theater;
import com.example.cinema_project.repository.CinemaRoomRepository;
import com.example.cinema_project.repository.ShowTimeRepository;
import com.example.cinema_project.serivce.CinemaRoomService;
import com.example.cinema_project.serivce.ShowTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class IShowTimeService implements ShowTimeService {

    @Autowired
    ShowTimeRepository showTimeRepository;
    @Autowired
    CinemaRoomRepository cinemaRoomRepository;


    @Override
    public List<ShowTime> getShowTimesByMovieIdAndShowDate(Long movieId, Date showDate) {
        return showTimeRepository.findByMovieIdAndShowDate(movieId, showDate);
    }

    @Override
    public Page<ShowTime> findAllShowTime(Pageable pageable) {
        return showTimeRepository.findAll(pageable);
    }

    @Override
    public Optional<ShowTime> findByIdShowTime(Long id) {
        return showTimeRepository.findById(id);
    }

    @Override
    public ShowTime insertShowTime(ShowTimeDTO showTimeDTO) {
        String showTime = showTimeDTO.getShowTime();
        String showTimeEnd = showTimeDTO.getShowTimeEnd();

        // Convert showDate to java.sql.Date
        Date showDate = showTimeDTO.getShowDate(); // Assumes showDate is a String in format yyyy-MM-dd

        // Check for conflicting show times
        boolean exists = showTimeRepository.existsConflict(
                showTimeDTO.getCinemaRoom().getId(),
                showDate,
                showTime,
                showTimeEnd
        );

        if (exists) {
            throw new RuntimeException("ShowTime overlaps with an existing show.");
        }

        ShowTime showTimeEntity = new ShowTime();
        showTimeEntity.setMovie(showTimeDTO.getMovie());
        showTimeEntity.setShowDate(showDate);
        showTimeEntity.setShowTime(showTime);
        showTimeEntity.setShowTimeEnd(showTimeEnd);
        showTimeEntity.setCinemaRoom(showTimeDTO.getCinemaRoom());
        return showTimeRepository.save(showTimeEntity);
    }

    @Override
    public ShowTime editShowTime(Long id, ShowTimeDTO showTimeDTO) {
        Optional<ShowTime> showTimeOptional = showTimeRepository.findById(id);
        if (showTimeOptional.isPresent()) {
            ShowTime showTimeToEdit = showTimeOptional.get();

            String showTime = showTimeDTO.getShowTime();
            String showTimeEnd = showTimeDTO.getShowTimeEnd();

            // Convert showDate to java.sql.Date
            Date showDate = showTimeDTO.getShowDate(); // Assumes showDate is a String in format yyyy-MM-dd

            // Check for conflicting show times excluding the current show time
            boolean exists = showTimeRepository.existsConflictExcludingCurrent(
                    showTimeDTO.getCinemaRoom().getId(),
                    showDate,
                    id,
                    showTime,
                    showTimeEnd
            );

            if (exists) {
                throw new RuntimeException("ShowTime overlaps with an existing show.");
            }

            showTimeToEdit.setMovie(showTimeDTO.getMovie());
            showTimeToEdit.setShowDate(showDate);
            showTimeToEdit.setShowTime(showTime);
            showTimeToEdit.setShowTimeEnd(showTimeEnd);
            showTimeToEdit.setCinemaRoom(showTimeDTO.getCinemaRoom());
            return showTimeRepository.save(showTimeToEdit);
        } else {
            throw new RuntimeException("ShowTime not found with id: " + id);
        }
    }
}


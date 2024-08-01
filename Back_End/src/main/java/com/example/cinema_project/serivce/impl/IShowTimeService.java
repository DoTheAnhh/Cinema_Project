package com.example.cinema_project.serivce.impl;

import com.example.cinema_project.dto.ShowTimeDTO;
import com.example.cinema_project.entity.ShowTime;
import com.example.cinema_project.entity.Theater;
import com.example.cinema_project.repository.ShowTimeRepository;
import com.example.cinema_project.serivce.ShowTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class IShowTimeService implements ShowTimeService {

    @Autowired
    ShowTimeRepository showTimeRepository;

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
        // Check for existing ShowTime with the same movie, date, and time
        boolean exists = showTimeRepository.existsByMovieAndShowDateAndShowTime(
                showTimeDTO.getMovie(),
                showTimeDTO.getShowDate(),
                showTimeDTO.getShowTime()
        );

        if (exists) {
            throw new RuntimeException("ShowTime already exists for this movie, date, and time.");
        }

        ShowTime showTime = new ShowTime();
        showTime.setMovie(showTimeDTO.getMovie());
        showTime.setShowDate(showTimeDTO.getShowDate());
        showTime.setShowTime(showTimeDTO.getShowTime());
        showTime.setTheater(showTimeDTO.getTheater());
        return showTimeRepository.save(showTime);
    }

    @Override
    public ShowTime editShowTime(Long id, ShowTimeDTO showTimeDTO) {
        Optional<ShowTime> showTimeOptional = showTimeRepository.findById(id);
        if (showTimeOptional.isPresent()) {
            ShowTime showTimeToEdit = showTimeOptional.get();

            // Check for existing ShowTime with the same movie, date, and time, excluding the current showTime
            boolean exists = showTimeRepository.existsByMovieAndShowDateAndShowTimeAndIdNot(
                    showTimeDTO.getMovie(),
                    showTimeDTO.getShowDate(),
                    showTimeDTO.getShowTime(),
                    id
            );

            if (exists) {
                throw new RuntimeException("ShowTime already exists for this movie, date, and time.");
            }

            showTimeToEdit.setMovie(showTimeDTO.getMovie());
            showTimeToEdit.setShowDate(showTimeDTO.getShowDate());
            showTimeToEdit.setShowTime(showTimeDTO.getShowTime());
            showTimeToEdit.setTheater(showTimeDTO.getTheater());
            return showTimeRepository.save(showTimeToEdit);
        } else {
            throw new RuntimeException("ShowTime not found with id: " + id);
        }
    }
}


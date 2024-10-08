package com.example.cinema_project.serivce.impl;

import com.example.cinema_project.dto.ShowTime.ShowTimeDTO;
import com.example.cinema_project.entity.ShowTime;
import com.example.cinema_project.repository.CinemaRoomRepository;
import com.example.cinema_project.repository.ShowTimeRepository;
import com.example.cinema_project.serivce.ShowTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

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
        Date showDate = showTimeDTO.getShowDate(); // Assumes showDate is a java.sql.Date

        // Check for conflicting show times
        boolean existsConflict = showTimeRepository.existsConflict(
                showTimeDTO.getCinemaRoom().getId(),
                showDate,
                showTime,
                showTimeEnd
        );

        // Check for conflicting show times for the same movie
        boolean existsConflictForMovie = showTimeRepository.existsConflictForMovie(
                showTimeDTO.getMovie().getId(),
                showDate,
                showTime,
                showTimeEnd
        );

        if (existsConflict || existsConflictForMovie) {
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
            Date showDate = showTimeDTO.getShowDate(); // Assumes showDate is a java.sql.Date

            boolean existsConflict = showTimeRepository.existsConflictExcludingCurrent(
                    showTimeDTO.getCinemaRoom().getId(),
                    showDate,
                    id,
                    showTime,
                    showTimeEnd
            );

            boolean existsConflictForMovie = showTimeRepository.existsConflictForMovieExcludingCurrent(
                    showTimeDTO.getMovie().getId(),
                    showDate,
                    id,
                    showTime,
                    showTimeEnd
            );

            if (existsConflict || existsConflictForMovie) {
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

    @Override
    public List<Object[]> getMovieIdAndShowTimeEndByDate(Date showDate) {
        return showTimeRepository.findMovieIdAndShowTimeEndByShowDate(showDate);
    }

}


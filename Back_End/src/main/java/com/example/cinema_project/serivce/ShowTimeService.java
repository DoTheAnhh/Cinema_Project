package com.example.cinema_project.serivce;

import com.example.cinema_project.dto.ShowTimeDTO;
import com.example.cinema_project.entity.CinemaRoom;
import com.example.cinema_project.entity.ShowTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

public interface ShowTimeService {

    List<ShowTime> getShowTimesByMovieIdAndShowDate(Long movieId, Date showDate);

    Page<ShowTime> findAllShowTime(Pageable pageable);

    Optional<ShowTime> findByIdShowTime(Long id);

    ShowTime insertShowTime(ShowTimeDTO showTimeDTO);

    ShowTime editShowTime(Long id, ShowTimeDTO showTimeDTO);
}

package com.example.cinema_project.repository;

import com.example.cinema_project.entity.Movie;
import com.example.cinema_project.entity.ShowTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ShowTimeRepository extends JpaRepository<ShowTime, Long> {

    @Query("SELECT st FROM ShowTime st WHERE st.movie.id = :movieId AND st.showDate = :showDate")
    List<ShowTime> findByMovieIdAndShowDate(@Param("movieId") Long movieId, @Param("showDate") Date showDate);

    boolean existsByMovieAndShowDateAndShowTime(Movie movie, Date showDate, String showTime);

    boolean existsByMovieAndShowDateAndShowTimeAndIdNot(Movie movie, Date showDate, String showTime, Long id);

    List<ShowTime> findByShowDateBefore(LocalDate date);
}

package com.example.cinema_project.repository;

import com.example.cinema_project.entity.CinemaRoom;
import com.example.cinema_project.entity.Movie;
import com.example.cinema_project.entity.ShowTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface ShowTimeRepository extends JpaRepository<ShowTime, Long> {

    @Query("SELECT st FROM ShowTime st WHERE st.movie.id = :movieId AND st.showDate = :showDate")
    List<ShowTime> findByMovieIdAndShowDate(@Param("movieId") Long movieId, @Param("showDate") Date showDate);

    @Query("SELECT COUNT(st) > 0 FROM ShowTime st " +
            "WHERE st.cinemaRoom.id = :cinemaRoomId " +
            "AND st.showDate = :showDate " +
            "AND (st.showTime < :showTimeEnd AND st.showTimeEnd > :showTime)")
    boolean existsConflict(@Param("cinemaRoomId") Long cinemaRoomId,
                           @Param("showDate") Date showDate,
                           @Param("showTime") String showTime,
                           @Param("showTimeEnd") String showTimeEnd);

    @Query("SELECT COUNT(st) > 0 FROM ShowTime st " +
            "WHERE st.cinemaRoom.id = :cinemaRoomId " +
            "AND st.showDate = :showDate " +
            "AND st.id != :showTimeId " +
            "AND (st.showTime < :showTimeEnd AND st.showTimeEnd > :showTime)")
    boolean existsConflictExcludingCurrent(@Param("cinemaRoomId") Long cinemaRoomId,
                                           @Param("showDate") Date showDate,
                                           @Param("showTimeId") Long showTimeId,
                                           @Param("showTime") String showTime,
                                           @Param("showTimeEnd") String showTimeEnd);

    @Query("SELECT COUNT(st) > 0 FROM ShowTime st " +
            "WHERE st.showDate = :showDate " +
            "AND st.movie.id = :movieId " +
            "AND (st.showTime < :showTimeEnd AND st.showTimeEnd > :showTime)")
    boolean existsConflictForMovie(@Param("movieId") Long movieId,
                                   @Param("showDate") Date showDate,
                                   @Param("showTime") String showTime,
                                   @Param("showTimeEnd") String showTimeEnd);

    @Query("SELECT COUNT(st) > 0 FROM ShowTime st " +
            "WHERE st.showDate = :showDate " +
            "AND st.movie.id = :movieId " +
            "AND st.id != :showTimeId " +
            "AND (st.showTime < :showTimeEnd AND st.showTimeEnd > :showTime)")
    boolean existsConflictForMovieExcludingCurrent(@Param("movieId") Long movieId,
                                                   @Param("showDate") Date showDate,
                                                   @Param("showTimeId") Long showTimeId,
                                                   @Param("showTime") String showTime,
                                                   @Param("showTimeEnd") String showTimeEnd
    );

    List<ShowTime> findByShowDateBefore(LocalDate date);
}

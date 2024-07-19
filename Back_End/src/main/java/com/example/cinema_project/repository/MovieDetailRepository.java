package com.example.cinema_project.repository;

import com.example.cinema_project.entity.MovieDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieDetailRepository extends JpaRepository<MovieDetail, Long>, JpaSpecificationExecutor<MovieDetail> {
}

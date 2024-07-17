package com.example.cinema_project.repository;

import com.example.cinema_project.entity.MovieType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieTypeRepository extends JpaRepository<MovieType, Long> {
}

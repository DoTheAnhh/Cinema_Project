package com.example.cinema_project.specification;

import com.example.cinema_project.entity.Movie;
import com.example.cinema_project.entity.MovieType;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

public class MovieSpecification {

    public static Specification<Movie> hasName(String movieName) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("movieName"), "%" + movieName + "%");
    }

    public static Specification<Movie> hasMovieType(Long[] movieTypes) {
        return (root, query, criteriaBuilder) -> {
            if (movieTypes == null || movieTypes.length == 0) {
                return null;
            }

            List<Predicate> predicates = new ArrayList<>();
            Join<Movie, MovieType> movieTypeJoin = root.join("movieTypes", JoinType.INNER);

            for (Long typeId : movieTypes) {
                if (typeId != null) {
                    predicates.add(criteriaBuilder.equal(movieTypeJoin.get("id"), typeId));
                }
            }

            return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
        };
    }

    public static Specification<Movie> hasReleaseDateBetween(Date fromDate, Date toDate) {
        return (Root<Movie> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            if (fromDate != null && toDate != null) {
                return criteriaBuilder.between(root.get("releaseDate"), fromDate, toDate);
            }
            return criteriaBuilder.conjunction();
        };
    }
}

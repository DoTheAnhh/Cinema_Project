package com.example.cinema_project.specification;

import com.example.cinema_project.entity.Actor;
import com.example.cinema_project.entity.MovieDetail;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class MovieDetailSpecification {

    public static Specification<MovieDetail> hasDirectorName(String directorName) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(criteriaBuilder.lower(root.get("directorName")), "%" + directorName.toLowerCase() + "%");
    }

    public static Specification<MovieDetail> hasMovie(Long movieId) {
        return (root, query, criteriaBuilder) -> {
            if (movieId != null) {
                return criteriaBuilder.equal(root.get("movies").get("id"), movieId);
            } else {
                return criteriaBuilder.conjunction();
            }
        };
    }

    public static Specification<MovieDetail> hasActors(Long[] actorIds) {
        return (root, query, criteriaBuilder) -> {
            if (actorIds == null || actorIds.length == 0) {
                return criteriaBuilder.conjunction();
            }

            List<Predicate> predicates = new ArrayList<>();
            Join<MovieDetail, Actor> actorJoin = root.join("actors", JoinType.INNER);

            for (Long actorId : actorIds) {
                if (actorId != null) {
                    predicates.add(criteriaBuilder.equal(actorJoin.get("id"), actorId));
                }
            }

            return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
        };
    }
}

package com.example.cinema_project.serivce.impl;

import com.example.cinema_project.dto.Actor.ActorDTO;
import com.example.cinema_project.entity.Actor;
import com.example.cinema_project.repository.ActorRepository;
import com.example.cinema_project.serivce.ActorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IActorService implements ActorService {

    @Autowired
    ActorRepository actorRepository;

    @Override
    public List<Actor> findAll() {
        return actorRepository.findAll();
    }

    @Override
    public Optional<Actor> findById(Long id) {
        return actorRepository.findById(id);
    }

    @Override
    public Actor insert(ActorDTO actorDTO) {
        Actor actor = new Actor();
        actor.setActorName(actorDTO.getActorName());
        return actorRepository.save(actor);
    }

    @Override
    public Actor update(ActorDTO actorDTO, Long id) {
        Optional<Actor> actorOptional = actorRepository.findById(id);
        if (actorOptional.isPresent()) {
            Actor actor = actorOptional.get();
            actor.setActorName(actorDTO.getActorName());
            return actorRepository.save(actor);
        } else {
            throw new RuntimeException("Actor not found with id: " + id);
        }
    }
}

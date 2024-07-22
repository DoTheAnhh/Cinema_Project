package com.example.cinema_project.serivce.impl;

import com.example.cinema_project.entity.Actor;
import com.example.cinema_project.repository.ActorRepository;
import com.example.cinema_project.serivce.ActorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IActorService implements ActorService {

    @Autowired
    ActorRepository actorRepository;

    @Override
    public List<Actor> findAll() {
        return actorRepository.findAll();
    }
}

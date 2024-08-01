package com.example.cinema_project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CinemaProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(CinemaProjectApplication.class, args);
    }

}

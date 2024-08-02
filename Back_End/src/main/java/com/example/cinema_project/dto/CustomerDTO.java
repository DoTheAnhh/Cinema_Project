package com.example.cinema_project.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class CustomerDTO {

    private String name;

    private int age;

    private Date birthday;

    private boolean gender;

    private String location;

    private String email;

    private String password;

    private String role;
}

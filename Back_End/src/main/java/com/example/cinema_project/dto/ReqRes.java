package com.example.cinema_project.dto;

import com.example.cinema_project.entity.Customer;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqRes {
    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String name;
    private String email;
    private String role;
    private String password;
    private Customer customer;
}

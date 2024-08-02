package com.example.cinema_project.serivce;

import com.example.cinema_project.dto.CustomerDTO;
import com.example.cinema_project.dto.MovieDTO;
import com.example.cinema_project.entity.Customer;
import com.example.cinema_project.entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface CustomerService {

    Page<Customer> findAll(Pageable pageable);

    Optional<Customer> findById(Long id);

    Customer insert(CustomerDTO customerDTO);

    Customer edit(CustomerDTO customerDTO, Long id);
}

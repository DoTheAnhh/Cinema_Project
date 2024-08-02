package com.example.cinema_project.controller;

import com.example.cinema_project.dto.CustomerDTO;
import com.example.cinema_project.entity.Customer;
import com.example.cinema_project.serivce.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/customers")
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @GetMapping("")
    public Page<Customer> findAll(@PageableDefault(size = 5) Pageable pageable) {
        return customerService.findAll(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> findById(@PathVariable Long id){
        Optional<Customer> e = customerService.findById(id);
        return e.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/insert-customer")
    public ResponseEntity<Customer> insertCustomer(@RequestBody CustomerDTO customerDTO) {
        return new ResponseEntity<>(customerService.insert(customerDTO), HttpStatus.CREATED);
    }

    @PutMapping("/edit-customer/{id}")
    public ResponseEntity<Customer> editCustomer(@PathVariable Long id, @RequestBody CustomerDTO customerDTO) {
        try {
            return new ResponseEntity<>(customerService.edit(customerDTO, id), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

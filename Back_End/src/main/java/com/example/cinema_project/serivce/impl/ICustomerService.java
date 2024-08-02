package com.example.cinema_project.serivce.impl;

import com.example.cinema_project.dto.CustomerDTO;
import com.example.cinema_project.entity.Customer;
import com.example.cinema_project.entity.Movie;
import com.example.cinema_project.repository.CustomerRepository;
import com.example.cinema_project.serivce.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ICustomerService implements CustomerService {

    @Autowired
    CustomerRepository customerRepository;

    @Override
    public Page<Customer> findAll(Pageable pageable) {
        return customerRepository.findAll(pageable);
    }

    @Override
    public Optional<Customer> findById(Long id) {
        return customerRepository.findById(id);
    }

    @Override
    public Customer insert(CustomerDTO customerDTO) {
        Customer customer = new Customer();
        customer.setName(customerDTO.getName());
        customer.setAge(customerDTO.getAge());
        customer.setGender(customerDTO.isGender());
        customer.setBirthday(customerDTO.getBirthday());
        customer.setLocation(customerDTO.getLocation());
        customer.setUsername(customerDTO.getUsername());
        customer.setPassword(customerDTO.getPassword());
        customer.setRole(customerDTO.getRole());
        return customerRepository.save(customer);
    }

    @Override
    public Customer edit(CustomerDTO customerDTO, Long id) {
        Optional<Customer> customerOptional = customerRepository.findById(id);
        if(customerOptional.isPresent()) {
            Customer customer = customerOptional.get();
            customer.setName(customerDTO.getName());
            customer.setAge(customerDTO.getAge());
            customer.setGender(customerDTO.isGender());
            customer.setBirthday(customerDTO.getBirthday());
            customer.setLocation(customerDTO.getLocation());
            customer.setUsername(customerDTO.getUsername());
            customer.setPassword(customerDTO.getPassword());
            customer.setRole(customerDTO.getRole());
            return customerRepository.save(customer);
        }
        else {
            throw new RuntimeException("Customer not found with id: " + id);
        }
    }
}

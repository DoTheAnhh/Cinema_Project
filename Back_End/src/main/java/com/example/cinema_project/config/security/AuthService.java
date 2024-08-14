package com.example.cinema_project.config.security;

import com.example.cinema_project.dto.ReqRes;
import com.example.cinema_project.entity.Customer;
import com.example.cinema_project.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class AuthService {

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    public ReqRes signUp(ReqRes registrationRequest) {
        ReqRes resp = new ReqRes();
        try {
            if (customerRepository.findByEmail(registrationRequest.getEmail()).isPresent()) {
                resp.setStatusCode(400);
                resp.setMessage("Email already exists");
                return resp;
            }
            Customer customer = new Customer();
            customer.setEmail(registrationRequest.getEmail());
            customer.setPassword(passwordEncoder.encode(registrationRequest.getPassword())); // Mã hóa mật khẩu
            customer.setRole(registrationRequest.getRole());
            Customer customerResult = customerRepository.save(customer);
            if (customerResult != null && customerResult.getId() > 0) {
                resp.setCustomer(customerResult);
                resp.setMessage("User Saved Successfully");
                resp.setStatusCode(200);
            }
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }


    public ReqRes signIn(ReqRes signInRequest) {
        ReqRes response = new ReqRes();
        try {
            // Tìm khách hàng bằng email
            Customer customer = customerRepository.findByEmail(signInRequest.getEmail()).orElseThrow(() ->
                    new RuntimeException("User not found with email: " + signInRequest.getEmail()));

            String passwordInDatabase = customer.getPassword();

            // Kiểm tra nếu mật khẩu trong cơ sở dữ liệu có thể là mã hóa
            boolean passwordMatches = passwordEncoder.matches(signInRequest.getPassword(), passwordInDatabase);

            // Nếu không khớp, thử kiểm tra mật khẩu văn bản thuần
            if (!passwordMatches) {
                passwordMatches = signInRequest.getPassword().equals(passwordInDatabase);
            }

            if (!passwordMatches) {
                response.setStatusCode(401);
                response.setMessage("Invalid credentials");
                return response;
            }

            // Tạo JWT và refresh token
            var jwt = jwtUtils.generateToken(customer);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), customer);

            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hr");
            response.setMessage("Successfully Sign In");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }
        return response;
    }



    public ReqRes refreshToken(ReqRes refreshTokenReqiest){
        ReqRes response = new ReqRes();
        String ourEmail = jwtUtils.extractUsername(refreshTokenReqiest.getToken());
        Customer customer = customerRepository.findByEmail(ourEmail).orElseThrow();
        if(jwtUtils.isTokenValid(refreshTokenReqiest.getToken(), customer)){
            var jwt = jwtUtils.generateToken(customer);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshTokenReqiest.getToken());
            response.setExpirationTime("24hr");
            response.setMessage("Succesfully Refresh Token");
        }
        response.setStatusCode(500);
        return response;
    }
}

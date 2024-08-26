package com.example.cinema_project.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private CustomerDetailService customerDetailService;

    @Autowired
    private JWTAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain (HttpSecurity httpSecurity) throws Exception{
        httpSecurity.csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(req ->
                        req
                                //ALL
                                .requestMatchers("/auth/**").permitAll()

                                .requestMatchers("/movies").permitAll()
                                .requestMatchers("/movies/*").permitAll()
                                .requestMatchers("/movies/search-movies").permitAll()

                                .requestMatchers("/cinema-rooms").permitAll()
                                .requestMatchers("/cinema-rooms/*").permitAll()
                                .requestMatchers("/cinema-rooms/theater/*").permitAll()
                                .requestMatchers("/cinema-rooms/search-cinema-rooms").permitAll()

                                .requestMatchers("/actors").permitAll()
                                .requestMatchers("/actors/*").permitAll()
                                .requestMatchers("/actors/search-actors").permitAll()

                                .requestMatchers("/customers").permitAll()
                                .requestMatchers("/customers/*").permitAll()
                                .requestMatchers("/customers/search-customers").permitAll()

                                .requestMatchers("/movie-types").permitAll()
                                .requestMatchers("/movie-types/*").permitAll()
                                .requestMatchers("/movie-types/search-movie-types").permitAll()

                                .requestMatchers("/show-times").permitAll()
                                .requestMatchers("/show-times/find-show-time-by-date").permitAll()
                                .requestMatchers("/show-times/*").permitAll()
                                .requestMatchers("/show-times/movie/*/date/*").permitAll()
                                .requestMatchers("/show-times/search-show-times").permitAll()

                                .requestMatchers("/theaters").permitAll()
                                .requestMatchers("/theaters/*").permitAll()
                                .requestMatchers("/theaters/search-theaters").permitAll()

                                .requestMatchers("/seats/cinema-room/*/show-time/*").permitAll()
                                .requestMatchers("/seats/update-status").permitAll()
                                .requestMatchers("/seats/check-status").permitAll()
                                .requestMatchers("/seats/check-statuss").permitAll()

                                .requestMatchers("/seat-cinema-rooms").permitAll()
                                .requestMatchers("/seat-cinema-rooms?page=*&size=*").permitAll()

                                .requestMatchers("/foods").permitAll()
                                .requestMatchers("/foods/update-quantity-food/*").permitAll()

                                .requestMatchers("/submitOrder").permitAll()
                                .requestMatchers("/submitOrder/*").permitAll()
                                .requestMatchers("/vnpay-payment-return").permitAll()
                                .requestMatchers("/vnpay-payment-return/*").permitAll()



                                //ADMIN
                                .requestMatchers("/movies/insert-movie").hasAnyAuthority( "ADMIN")
                                .requestMatchers("/movies/edit-movie/*").hasAnyAuthority( "ADMIN")

                                .requestMatchers("/actors/insert-actor").hasAnyAuthority( "ADMIN")
                                .requestMatchers("/actors/edit-actor/*").hasAnyAuthority( "ADMIN")

                                .requestMatchers("/cinema-rooms/insert-cinema-room").hasAnyAuthority( "ADMIN")
                                .requestMatchers("/cinema-rooms/edit-cinema-room/*").hasAnyAuthority( "ADMIN")

                                .requestMatchers("/customers/insert-customer").hasAnyAuthority( "ADMIN")
                                .requestMatchers("/customers/edit-customer/*").hasAnyAuthority( "ADMIN")

                                .requestMatchers("/movie-types/insert-movie-type").hasAnyAuthority( "ADMIN")
                                .requestMatchers("/movie-types/edit-movie-type/*").hasAnyAuthority( "ADMIN")

                                .requestMatchers("/show-times/insert-show-time").hasAnyAuthority( "ADMIN")
                                .requestMatchers("/show-times/edit-show-time/*").hasAnyAuthority( "ADMIN")

                                .requestMatchers("/theaters/insert-theater").hasAnyAuthority( "ADMIN")
                                .requestMatchers("/theaters/edit-theater/*").hasAnyAuthority( "ADMIN")

                                .requestMatchers("/foods/insert-food").hasAnyAuthority( "ADMIN")
                                .requestMatchers("/foods/edit-food/*").hasAnyAuthority( "ADMIN")

                                .anyRequest().authenticated())
                .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider()).addFilterBefore(
                        jwtAuthFilter, UsernamePasswordAuthenticationFilter.class
                );
        return httpSecurity.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(customerDetailService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}

package com.example.cinema_project.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieRequest {

    private String banner;

    private String movieName;

    private String duration;

    private String releaseDate;

    private String movieTypeName;
}

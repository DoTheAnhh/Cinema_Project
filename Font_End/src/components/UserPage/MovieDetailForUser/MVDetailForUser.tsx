import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LOCALHOST, REQUEST_MAPPING, API } from '../../APIs/typing';
import { MovieDetaill } from '../../Types';

const MVDetailForUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movieDetails, setMovieDetails] = useState<MovieDetaill>();

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const res = await axios.get(`${LOCALHOST}${REQUEST_MAPPING.MOVIE_DETAIL + API.MOVIE_DETAIL.GETALL_MOVIE_DETAIL }/${id}`);
        setMovieDetails(res.data);
      } catch (error) {
        console.error('Error fetching movie detail:', error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  return (
    <div>
      <h1>{movieDetails?.movies.movieName}</h1>
      <img src={movieDetails?.movies.banner} alt={movieDetails?.movies.movieName} />
      <p>{movieDetails?.movies.description}</p>
      {/* Render more movie details as needed */}
    </div>
  );
};

export default MVDetailForUser;

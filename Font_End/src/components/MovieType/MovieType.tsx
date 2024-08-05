import { Button, Form, Input, message, Popconfirm } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API, LOCALHOST, REQUEST_MAPPING } from '../APIs/typing';
import { MovieTypee } from '../Types';

interface MovieTypeProps {
  movieType: MovieTypee | null;
  onClose: () => void;
  onSuccess: () => void;
}

const MovieType: React.FC<MovieTypeProps> = ({ movieType, onClose, onSuccess }) => {
  const [movieTypeName, setMovieTypeName] = useState<string>('');

  useEffect(() => {
    if (movieType) {
      setMovieTypeName(movieType.movieTypeName);
    } else {
      setMovieTypeName('');
    }
  }, [movieType]);

  const decodeJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Invalid token");
      return null;
    }
  };

  const handleInsertOrUpdateMovieType = async () => {
    if (!movieTypeName.trim()) {
      message.error('Movie type name is required');
      return false;
    }
    try {

      const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }

            const decodedToken = decodeJwt(token);
            if (!decodedToken) {
                console.error('Invalid token');
                return;
            }

            const userRole = decodedToken.role;

            if (userRole !== 'ADMIN') {
                console.error('User does not have the required ADMIN role');
                return;
            }

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

      const data = { movieTypeName };
      if (movieType && movieType.id) {
        await axios.put(LOCALHOST + REQUEST_MAPPING.MOVIE_TYPE + API.MOVIE_TYPE.EDIT_MOVIE_TYPE + `/${movieType.id}`, data, config);
      } else {
        await axios.post(LOCALHOST + REQUEST_MAPPING.MOVIE_TYPE + API.MOVIE_TYPE.INSERT_MOVIE_TYPE, data, config);
      }
      onSuccess()
      onClose()
    } catch (e) {
      console.error('Error adding item: ', e);
    }
  };

  return (
    <>
      <Form>
        <Form.Item label="Movie type name" required>
          <Input value={movieTypeName} onChange={(e) => setMovieTypeName(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Popconfirm
            title="Are you sure to submit this movie type?"
            onConfirm={handleInsertOrUpdateMovieType}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary">Submit</Button>
          </Popconfirm>
        </Form.Item>
      </Form>
    </>
  );
};

export default MovieType;

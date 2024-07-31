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

  const handleInsertOrUpdateMovieType = async () => {
    if (!movieTypeName.trim()) {
      message.error('Movie type name is required');
      return false;
    }
    try {
      const data = { movieTypeName };
      if (movieType && movieType.id) {
        await axios.put(LOCALHOST + REQUEST_MAPPING.MOVIE_TYPE + API.MOVIE_TYPE.EDIT_MOVIE_TYPE + `/${movieType.id}`, data);
      } else {
        await axios.post(LOCALHOST + REQUEST_MAPPING.MOVIE_TYPE + API.MOVIE_TYPE.INSERT_MOVIE_TYPE, data);
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

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Input, message, Popconfirm, Select } from 'antd';
import { MovieTypee } from '../Types';
import { API, LOCALHOST, REQUEST_MAPPING } from '../APIs/typing';

const Movie: React.FC = () => {

  const [movieName, setMovieName] = useState<string>("");
  const [banner, setBanner] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [releaseDate, setReleaseDate] = useState<any>("");
  const [movieType, setMovieType] = useState<string[]>([]);

  const [movieTypes, setMovieTypes] = useState<MovieTypee[]>([])

  const navigator = useNavigate();
  const { id } = useParams()

  const movie = { movieName, banner, duration, releaseDate, movieType }

  const fetchMovieType = async () => {
    try {
      const res = await axios.get<MovieTypee[]>(LOCALHOST + REQUEST_MAPPING.MOVIE_TYPE + API.MOVIE_TYPE.GETALL_MOVIE_TYPE);
      setMovieTypes(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const fetchMovie = async (id: number) => {
    try {
      const res = await axios.get(LOCALHOST + REQUEST_MAPPING.MOVIE + API.MOVIE.GETALL_MOVIE + `/${id}`)
      const movieData = res.data
      setMovieName(movieData.movieName)
      setBanner(movieData.banner)
      setDuration(movieData.duration)
      setReleaseDate(movieData.releaseDate)
      if (movieData.movieTypes) {
        const mappedMovieTypes = movieData.movieTypes.map((type: MovieTypee) => ({
          value: type.id.toString(),
          label: type.movieTypeName,
        }));
        setMovieType(mappedMovieTypes);
      } else {
        setMovieType([]);
      }
    } catch (err) {
      console.error('Error fetching movie: ', err);
    }
  }

  

  const validateForm = (): boolean => {
    if (!movieName.trim()) {
      message.error("Movie name is required")
      return false;
    }
    if (!movieType) {
      message.error("Movie type is required")
    }
    if (duration === undefined || isNaN(duration)) {
      message.error("Duration is required")
      return false;
    }
    if (releaseDate === undefined || isNaN(duration)) {
      message.error("Release date is required")
      return false;
    }
    if (!banner.trim()) {
      message.error("Banner is required")
      return false;
    }
    return true;
  }

  const handleInsertOrUpdateMovie = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const data = {
        ...movie,
      };
      console.log(data);
      if (id) {
        await axios.put(LOCALHOST + REQUEST_MAPPING.MOVIE + API.MOVIE.EDIT_MOVIE + `/${id}`, data);
      } else {
        await axios.post(LOCALHOST + REQUEST_MAPPING.MOVIE + API.MOVIE.INSERT_MOVIE, data);
      }
      backToList();
    } catch (e) {
      console.error('Error adding item: ', e);
    }
  };



  const backToList = () => {
    navigator("/dotheanh/movies");
  };

  const options = movieTypes.map((type) => ({
    value: type.id.toString(),
    label: type.movieTypeName,
  }));

  useEffect(() => {
    fetchMovieType()
    if (id) {
      fetchMovie(Number(id))
    }
  }, [id])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: '', minHeight: '100vh' }}>
      <div className="container mt-5" style={{ width: 500 }}>
        <Form layout="vertical">
          <Form.Item label="Movie name" required>
            <Input value={movieName} onChange={(e) => setMovieName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Duration" required>
            <Input type='number' value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
          </Form.Item>
          <Form.Item label="Release date" required>
            <Input type='date' value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
          </Form.Item>
          <Form.Item label="Banner" required>
            <Input value={banner} onChange={(e) => setBanner(e.target.value)} />
          </Form.Item>
          <Form.Item label="Movie type" required>
            <Select
              mode="multiple"
              placeholder="Movie type"
              options={options}
              style={{ width: '300px', maxHeight: '300px', overflow: 'auto' }}
              value={movieType}
              onChange={(value) => setMovieType(value)}
            />
          </Form.Item>
          <Form.Item>
            <Popconfirm
              title="Are you sure to submit this movie?"
              onConfirm={() => handleInsertOrUpdateMovie()}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary">Submit</Button>
            </Popconfirm>
            <Popconfirm
              title="Are you sure back to list?"
              className="ms-2"
              onConfirm={backToList}
              okText="Yes"
              cancelText="No">
              <Button type="default" style={{ marginLeft: 20 }}>Back to list</Button>
            </Popconfirm>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Movie
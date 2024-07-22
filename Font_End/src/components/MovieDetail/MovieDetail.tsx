import React, { useEffect, useMemo, useState } from 'react'
import { Actorr, Moviee } from '../Types'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { API, LOCALHOST, REQUEST_MAPPING } from '../APIs/typing'
import { Button, Form, Input, message, Popconfirm, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'

const MovieDetail: React.FC = () => {

  const [movie, setMovie] = useState<Moviee>()
  const [trailer, setTrailer] = useState<string>("")
  const [directorName, setDirectorName] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [actor, setActor] = useState<number[]>([])

  const [actors, setActors] = useState<Actorr[]>([])
  const [movies, setMovies] = useState<Moviee[]>([])

  const { id } = useParams()

  const navigator = useNavigate();

  const fetchMovieDetail = async (id: number) => {
    try {
        const res = await axios.get(LOCALHOST + REQUEST_MAPPING.MOVIE_DETAIL + API.MOVIE_DETAIL.GETALL_MOVIE_DETAIL + `/${id}`)
        const movieDetailData = res.data
        setContent(movieDetailData.content)
        setDirectorName(movieDetailData.directorName)
        setTrailer(movieDetailData.trailer)
        setMovie(movieDetailData.movies?.movieName)
        if (movieDetailData.actors) {
            const mappedActors = movieDetailData.actors.map((act: Actorr) => act.id.toString());
            setActor(mappedActors);
        } else {
            setActor([]);
        }
        console.log('res.data', res.data);
        
    } catch (err) {
        console.error('Error fetching movie: ', err);
    }
}

  const fetchActor = async () => {
    try {
      const res = await axios.get<Actorr[]>(LOCALHOST + REQUEST_MAPPING.ACTOR + API.ACTOR.GETALL_ACTOR)
      setActors(res.data)
    } catch (error) {
      return [];
    }
  }

  const fetchMovie = async () => {
    try {
      const res = await axios.get<Moviee>(LOCALHOST + REQUEST_MAPPING.MOVIE + API.MOVIE.GETALL_MOVIE);
      setMovies(res.data.content);
    } catch (error) {
      return [];
    }
  };

  const optionsActor = useMemo(() => actors.map((act) => ({
    value: act.id.toString(),
    label: act.actorName,
  })), [actors]);

  const optionsMovie = useMemo(() => movies.map((mov) => ({
    value: mov.id.toString(),
    label: mov.movieName,
  })), [movies]);

  const validateForm = (): boolean => {
    if (!trailer.trim()) {
      message.error("Trailer name is required")
      return false;
    }
    if (!directorName.trim()) {
      message.error("Director name is required")
      return false;
    }
    if (!content.trim()) {
      message.error("Content is required")
      return false;
    }
    if (!actor) {
      message.error("Actor name is required")
      return false;
    }
    return true
  }

  const handleInsertOrUpdateMovieDetail = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const data = {
        movie: { id: movie },
        trailer: trailer,
        directorName: directorName,
        content: content,
        actor: actor,
    };
      if (id) {
        await axios.put(LOCALHOST + REQUEST_MAPPING.MOVIE_DETAIL + API.MOVIE_DETAIL.EDIT_MOVIE_DETAIL + `/${id}`, data);
      } else {
        await axios.post(LOCALHOST + REQUEST_MAPPING.MOVIE_DETAIL + API.MOVIE_DETAIL.INSERT_MOVIE_DETAIL, data);
      }
      backToList();
    } catch (e) {
      console.error('Error adding item: ', e);
    }
  };

  const backToList = () => {
    navigator("/dotheanh/movie-details");
  };

  useEffect(() => {
    fetchActor()
    fetchMovie()
    if (id) {
      fetchMovieDetail(Number(id))
    }
  }, [id])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="container mt-5" style={{ width: 500 }}>
        <Form layout="vertical">
          <Form.Item label="Movie name" required>
            <Select
              placeholder="Movie name"
              style={{ width: '100%', maxHeight: '300px', overflow: 'auto' }}
              value={movie}
              options={optionsMovie}
              onChange={(value) => setMovie(value)}
            />
          </Form.Item>
          <Form.Item label="Director name" required>
            <Input placeholder='Director name' value={directorName} onChange={(e) => setDirectorName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Actor name" required>
            <Select
              mode="multiple"
              placeholder="Actor"
              options={optionsActor}
              style={{ width: '100%', maxHeight: '300px', overflow: 'auto' }}
              value={actor}
              onChange={(value) => setActor(value)}
            />
          </Form.Item>
          <Form.Item label="Trailer" required>
            <Input placeholder='Trailer' value={trailer} onChange={(e) => setTrailer(e.target.value)} />
          </Form.Item>
          <Form.Item label="Content" required>
            <TextArea placeholder='Content' value={content} onChange={(e) => setContent(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Popconfirm
              title="Are you sure to submit this movie?"
              onConfirm={() => handleInsertOrUpdateMovieDetail()}
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

export default MovieDetail
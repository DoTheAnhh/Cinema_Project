import React, { useEffect, useMemo, useState } from 'react'
import { Actorr, Moviee } from '../Types'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { API, LOCALHOST, REQUEST_MAPPING } from '../APIs/typing'
import { Button, Form, Input, message, Popconfirm, Select, Image } from 'antd'
import TextArea from 'antd/es/input/TextArea'

const MovieDetail: React.FC = () => {

  const [movie, setMovie] = useState<number | undefined>()
  const [trailer, setTrailer] = useState<string>("")
  const [directorName, setDirectorName] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [actorIds, setActorIds] = useState<number[]>([])

  const [totalMovie, setTotalMovie] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(999999999);

  const [bannerUrl, setBannerUrl] = useState<string>('');

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
      setMovie(movieDetailData.movies.id)
      if (movieDetailData.actors) {
        const mappedActors = movieDetailData.actors.map((act: Actorr) => act.id);
        setActorIds(mappedActors);
      } else {
        setActorIds([]);
      }
      setBannerUrl(movieDetailData.movies.banner);
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

  const fetchMovie = async (page: number, size: number): Promise<Moviee[]> => {
    try {
      const res = await axios.get(LOCALHOST + REQUEST_MAPPING.MOVIE + API.MOVIE.GETALL_MOVIE, {
        params: {
          page: page - 1,
          size: size,
        },
      });
      setTotalMovie(res.data.totalElements);
      return res.data.content;
    } catch (error) {
      console.error("Error fetching data:", error);
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
    if (!movie) {
      message.error("Movie name is required")
      return false;
    }
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
    if (actorIds.length === 0) {
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
        actor: actorIds,
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

  const handleMovieChange = (value: string) => {
    const selectedMovie = movies.find(movie => movie.id.toString() === value);
    if (selectedMovie) {
      setBannerUrl(selectedMovie.banner);
      setMovie(selectedMovie.id); // Set movieId
    }
  };

  const backToList = () => {
    navigator("/dotheanh/movie-details")
  };

  useEffect(() => {
    fetchActor()
    fetchMovie(currentPage, pageSize).then((data) => {
      setMovies(data);
    });
    if (id) {
      fetchMovieDetail(Number(id))
    }
  }, [id])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="container mt-5" style={{ width: 800 }}>
        <Form layout="vertical">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <Form.Item label="Movie name" required>
                <Select
                  placeholder="Movie name"
                  style={{ width: '100%', maxHeight: '300px', overflow: 'auto' }}
                  value={movie?.toString()}
                  options={optionsMovie}
                  onChange={handleMovieChange}
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
                  value={actorIds.map(id => id.toString())} // Ensure actorIds are strings
                  onChange={(value) => setActorIds(value.map(val => parseInt(val)))}
                />
              </Form.Item>
              <Form.Item label="Trailer" required>
                <Input placeholder='Trailer' value={trailer} onChange={(e) => setTrailer(e.target.value)} />
              </Form.Item>
              <Form.Item label="Content" required>
                <TextArea placeholder='Content' value={content} onChange={(e) => setContent(e.target.value)} />
              </Form.Item>
            </div>
            <div style={{ marginRight: -120, marginLeft: 130, marginTop: -70 }}>
              <Form.Item>
                <Image
                  style={{ width: 200, height: 300 }}
                  src={bannerUrl || 'https://via.placeholder.com/130x200?text=No+Image'}
                  alt="Movie Banner"
                />
              </Form.Item>
            </div>
          </div>
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

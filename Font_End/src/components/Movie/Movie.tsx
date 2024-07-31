import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Image, Input, message, Modal, Popconfirm, Select } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import { Actorr, MovieTypee } from '../Types';
import { API, LOCALHOST, REQUEST_MAPPING } from '../APIs/typing';
import TextArea from 'antd/es/input/TextArea';
import ListMovieType from '../MovieType/ListMovieType';
import ListActor from '../Actor/ListActor';

const Movie: React.FC = () => {

  const [movieName, setMovieName] = useState<string>("");
  const [banner, setBanner] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [releaseDate, setReleaseDate] = useState<any>("");
  const [trailer, setTrailer] = useState<string>("")
  const [directorName, setDirectorName] = useState<string>("")
  const [content, setContent] = useState<string>("")

  const [movieType, setMovieType] = useState<string[]>([]);
  const [actor, setActor] = useState<string[]>([])

  const [movieTypes, setMovieTypes] = useState<MovieTypee[]>([])
  const [actors, setActors] = useState<Actorr[]>([])

  const [isModalOpenMovieType, setIsModalOpenMovieType] = useState(false);
  const [isModalOpenActor, setIsModalOpenActor] = useState(false);

  const navigator = useNavigate();

  const { id } = useParams()

  const movie = { movieName, banner, duration, releaseDate, trailer, directorName, content }

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
        const mappedMovieTypes = movieData.movieTypes.map((type: MovieTypee) => type.id.toString());
        setMovieType(mappedMovieTypes);
      } else {
        setMovieType([]);
      }

      if (movieData.actors) {
        const mappedActors = movieData.actors.map((act: Actorr) => act.id.toString());
        setActor(mappedActors);
      } else {
        setActor([]);
      }
      setContent(movieData.content)
      setDirectorName(movieData.directorName)
      setTrailer(movieData.trailer)

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
    if (actor.length === 0) {
      message.error("Actor name is required")
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
        movieTypes: movieType,
        actors: actor,
      };
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

  const optionsActor = useMemo(() => actors.map((act) => ({
    value: act.id.toString(),
    label: act.actorName,
  })), [actors]);

  const backToList = () => {
    navigator("/dotheanh/movies");
  };

  const options = movieTypes.map((type) => ({
    value: type.id.toString(),
    label: type.movieTypeName,
  }));

  const showModalMovieType = () => {
    setIsModalOpenMovieType(true);
  };

  const handleCancelMovieType = () => {
    setIsModalOpenMovieType(false);
    fetchMovieType()
  };

  const showModalActor = () => {
    setIsModalOpenActor(true);
  };

  const handleCancelActor = () => {
    setIsModalOpenActor(false);
    fetchActor()
  };

  useEffect(() => {
    fetchMovieType()
    fetchActor()
    if (id) {
      fetchMovie(Number(id))
    }
  }, [id])
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="container mt-5" style={{ width: '1000px', display: 'flex', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
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
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Select
                  mode="multiple"
                  placeholder="Movie type"
                  options={options}
                  style={{ width: '100%', maxHeight: '300px', overflow: 'auto' }}
                  value={movieType}
                  onChange={(value) => setMovieType(value)}
                />
                <PlusOutlined style={{ marginLeft: '15px', marginRight: -45 }} onClick={showModalMovieType} />
                <Modal
                  title="Movie type"
                  open={isModalOpenMovieType}
                  onCancel={handleCancelMovieType}
                  footer={(_, { CancelBtn }) => (
                    <>
                      <CancelBtn />
                    </>
                  )}
                >
                  <ListMovieType />
                </Modal>
              </div>
            </Form.Item>
            <Form.Item label="Director name" required>
              <Input placeholder='Director name' value={directorName} onChange={(e) => setDirectorName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Actor name" required>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Select
                  mode="multiple"
                  placeholder="Actor"
                  options={optionsActor}
                  style={{ width: '100%', maxHeight: '300px', overflow: 'auto' }}
                  value={actor}
                  onChange={(value) => setActor(value)}
                />
                <PlusOutlined style={{ marginLeft: '15px', marginRight: -45 }} onClick={showModalActor} />
                <Modal
                  title="Actor"
                  open={isModalOpenActor}
                  onCancel={handleCancelActor}
                  footer={(_, { CancelBtn }) => (
                    <>
                      <CancelBtn />
                    </>
                  )}
                >
                  <ListActor />
                </Modal>
              </div>
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
        <div style={{ marginRight: -60, marginLeft: 130, marginTop: 30 }}>
          <Image
            style={{ width: 200, height: 300, marginLeft: -30 }}
            src={banner || 'https://via.placeholder.com/130x200?text=No+Image'}
            alt="Movie Banner"
          />
        </div>
      </div>
    </div>
  )
}

export default Movie;

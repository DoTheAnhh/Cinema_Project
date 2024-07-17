import React, { useEffect, useState } from 'react'
import { MovieType } from '../type';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API, LOCALHOST, REQUEST_MAPPING } from '../../APIs/typing';
import { Button, Form, Input, message, Popconfirm, Select } from 'antd';

const Movie: React.FC = () => {

    const [movieName, setMovieName] = useState<string>("");
    const [banner, setBanner] = useState<string>("");
    const [duration, setDuration] = useState<number>(0);
    const [releaseDate, setReleaseDate] = useState<Date | string>("");
    const [movieType, setMovieType] = useState<MovieType[] | null>([]);

    const [movieTypes, setMovieTypes] = useState<MovieType[]>([])

    const navigator = useNavigate();
    const { id } = useParams()

    const movie = { movieName, banner, duration, releaseDate, movieType }

    const fetchMovieType = async () => {
        try {
          const res = await axios.get<MovieType[]>(LOCALHOST + REQUEST_MAPPING.MOVIE_TYPE + API.MOVIE_TYPE.GETALL_MOVIE_TYPE);
          setMovieTypes(res.data); // Cập nhật danh sách MovieType vào state
        } catch (error) {
          console.error("Error fetching data:", error);
          return [];
        }
      };

    const fetchMovie = async (id: number) => {
        try {
            const res = await axios.get(LOCALHOST + REQUEST_MAPPING.MOVIE + API.MOVIE.GETALL_MOVIE + '/{id}')
            const movieData = res.data
            setMovieName(movieData.movieName)
            setBanner(movieData.banner)
            setDuration(movieData.duration)
            setReleaseDate(movieData.releaseDate)
            if(movieData.movieType){
                setMovieType([{
                    id: movieData.movieType.id,
                    movieTypeName: movieData.movieType.movieTypeName
                }])
            } else {
                setMovieType(null)
            }
        } catch (err) {
            console.error('Error fetching movie: ', err);
        }
    }

    const validateForm = (): boolean => {
        if(!movieName.trim()){
            message.error("Movie name is required")
            return false;
        }
        if(!movieType){
            message.error("Movie type is required")
        }
        if(duration === undefined || isNaN(duration)){
            message.error("Duration is required")
            return false;
        }
        if(releaseDate === undefined || isNaN(duration)){
            message.error("Release date is required")
            return false;
        }
        if(!banner.trim()){
            message.error("Banner is required")
            return false;
        }
        return true;
    }

    const backToList = () => {
        navigator("/dotheanh/movies");
    };

    const options = movieTypes.map((type) => ({
        value: type.id.toString(),
        label: type.movieTypeName,
      }));

    useEffect(() => {
        fetchMovieType()
        if(id){
            fetchMovie(Number(id))
        }
    }, [id])

  return (
    <div className="container mt-5">
      <Form layout="vertical">
        <Form.Item label="Movie name" required>
          <Input value={movieName} onChange={(e) => setMovieName(e.target.value)} />
        </Form.Item>
        <Form.Item label="Duration" required>
          <Input type='number' value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
        </Form.Item>
        {/* <Form.Item label="Release date" required>
          <Input type='Date' value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
        </Form.Item> */}
        <Form.Item label="Banner" required>
          <Input value={banner} onChange={(e) => setBanner(e.target.value)} />
        </Form.Item>
        <Form.Item label="Position" required>
        <Select
              mode="multiple"
              allowClear
              placeholder="Movie type"
              options={options}
              style={{ width: '300px', maxHeight: '300px', overflow: 'auto' }}
            />
        </Form.Item>
        <Form.Item>
          <Popconfirm
            title="Are you sure to submit this Employee ?"
            //onConfirm={() => handleAddOrUpdateEmployee()}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary">Submit</Button>
          </Popconfirm>
          <Popconfirm
            title="Are you sure back to list ?"
            className="ms-2"
            onConfirm={backToList}
            okText="Yes"
            cancelText="No">
            <Button type="default">Back to list</Button>
          </Popconfirm>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Movie
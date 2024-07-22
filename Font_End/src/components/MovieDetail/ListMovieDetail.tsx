import React, { useEffect, useState } from 'react'
import { Actorr, MovieDetaill } from '../Types'
import axios from 'axios'
import { API, LOCALHOST, REQUEST_MAPPING } from '../APIs/typing'
import { Button, Col, Input, Pagination, Row, Select, Table, Tag, Tooltip } from 'antd'
import { EditFilled, PlayCircleOutlined } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom'

const ListMovieDetail: React.FC = () => {

  const [movieDetails, setMovieDetails] = useState<MovieDetaill[]>([])

  const [searchTermMovieName, setSearchTermMovieName] = useState<string>("")
  const [searchTermDirectorName, setSearchTermDirectorName] = useState<string>("")
  const [directorName, setDirectorName] = useState<string>("")
  const [actor, setActor] = useState<string>("")
  const [movie, setMovie] = useState<string>("")

  const [actors, setActors] = useState<Actorr[]>([])

  const [currentPage, setCurrentPage] = useState<number>(0); // State để theo dõi trang hiện tại
  const [pageSize, setPageSize] = useState<number>(5); // Số mục trên mỗi trang
  const [totalMovieDetail, setTotalMovieDetail] = useState<number>(0); // Tổng số phần tử

  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  const navigator = useNavigate()

  const handleChangeMovieName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTermMovieName(value);

    if (value === "") {
      setCurrentPage(0);
    }
    handleSearch(value, directorName, actor, currentPage, pageSize);
  };

  const handleChangeDirectorName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTermDirectorName(value);

    if (value === "") {
      setCurrentPage(0);
    }
    handleSearch(movie, value, actor, currentPage, pageSize);
  };

  const handleChangeActor = (value: string) => {
    setActor(value);
    handleSearch(movie, directorName, value, currentPage, pageSize);
  };

  const handleSearch = async (
    searchMovieName: string,
    searchDirectorName: string,
    searchActorId: any,
    page: number,
    size: number
  ) => {
    try {
      let url = LOCALHOST + REQUEST_MAPPING.MOVIE_DETAIL + API.MOVIE_DETAIL.SEARCH_MOVIE_DETAIL + `?page=${page}&size=${size}`;

      if (searchMovieName) {
        url += `&movie=${encodeURIComponent(searchMovieName)}`;
      }

      if (searchActorId) {
        searchActorId.forEach((actorName: any) => {
          url += `&actor=${encodeURIComponent(actorName)}`;
        });
      }

      if (searchDirectorName) {
        url += `&directorName=${encodeURIComponent(searchDirectorName)}`;
      }

      const res = await axios.get(url);
      setMovieDetails(res.data.content); // Đảm bảo cập nhật dữ liệu cùng định dạng
      setTotalMovieDetail(res.data.totalElements); // Cập nhật tổng số phần tử
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchMovieDetails(page, pageSize);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0);
    fetchMovieDetails(0, size);
  };

  const fetchMovieDetails = async (page: number, size: number): Promise<MovieDetaill[]> => {
    try {
      const res = await axios.get(LOCALHOST + REQUEST_MAPPING.MOVIE_DETAIL + API.MOVIE_DETAIL.GETALL_MOVIE_DETAIL, {
        params: {
          page: page - 1,
          size: size
        }
      })
      setTotalMovieDetail(res.data.totalElements)
      return res.data.content
    } catch (e) {
      console.error('Error fetching data:', e);
      return [];
    }
  }

  const fetchActor = async () => {
    try {
      const res = await axios.get(LOCALHOST + REQUEST_MAPPING.ACTOR + API.ACTOR.GETALL_ACTOR)
      setActors(res.data)
    } catch (e) {
      console.error(e);
      return []
    }
  }
  
  const editMovieDetail = (id: number) => {
    navigator(`/dotheanh/movie-details/movie-detail/${id}`);
  }

  useEffect(() => {
    fetchMovieDetails(currentPage, pageSize).then((data) => {
      setMovieDetails(data);
    })
  }, [currentPage, pageSize])

  useEffect(() => {
    fetchActor();
  }, []);

  const columns = [
    {
      title: 'Banner',
      dataIndex: ['movies', 'banner'],
      key: 'movies',
      align: "center" as const,
      render: (banner: any) => (
        <img
          src={banner}
          alt="Banner"
          style={{ width: '125px', height: '180px' }}
        />
      ),
    },
    {
      title: 'Movie',
      dataIndex: ['movies', 'movieName'],
      key: 'movies',
      align: "center" as const,
      render: (movieName: string) => <span style={{ fontWeight: 'bold', fontSize: '25px' }}>{movieName}</span>,
    },
    {
      title: 'Director name',
      dataIndex: 'directorName',
      key: 'directorName',
      align: "center" as const,
      render: (directorNames: any[]) =>
        <Tag style={{ fontSize: '12px', padding: '6px 12px', margin: '4px' }}>
          {directorNames}
        </Tag>
    },
    {
      title: 'Actor',
      dataIndex: 'actors',
      key: 'actors',
      align: "center" as const,
      render: (actors: any[]) =>
        actors.map((actor: any) => (
          <Tag key={actor.actorName} style={{ fontSize: '12px', padding: '6px 12px', margin: '4px' }}>
            {actor.actorName}
          </Tag>
        )),
    },
    {
      title: 'Trailer',
      dataIndex: 'trailer',
      key: 'trailer',
      align: "center" as const,
      render: (trailerUrl: string, record: MovieDetaill) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {expandedRowKeys.includes(record.id) && (
            <iframe
              width="220"
              height="150"
              src={trailerUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{ border: 'none' }}
            ></iframe>
          )}
          <Button
            icon={<PlayCircleOutlined />}
            onClick={() => {
              setExpandedRowKeys(expandedRowKeys.includes(record.id) ? [] : [record.id]);
            }}
            style={{ marginTop: '5px', height: 30, width: 70 }}
          >
            {expandedRowKeys.includes(record.id) ? 'Hide' : 'Show'}
          </Button>
        </div>
      ),
    }
    ,
    {
      title: "Action",
      key: "action",
      align: "center" as const,
      render: (record: MovieDetaill) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Tooltip title="Edit">
            <Button
              type="primary"
              style={{ marginLeft: 10 }}
              onClick={() => editMovieDetail(record.id)}
              icon={<EditFilled />}
            />
          </Tooltip>
        </div>
      ),
    }
  ]

  const options = actors.map((type) => ({
    value: type.id.toString(),
    label: type.actorName,
  }));

  return (
    <>
      <div>
        <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
          <Col>
            <Input
              value={searchTermMovieName}
              onChange={handleChangeMovieName}
              placeholder="Search by movie name ..."
              allowClear
              style={{ width: "300px", height: 30 }}
            />
          </Col>
          <Col>
            <Input
              value={searchTermDirectorName}
              onChange={handleChangeDirectorName}
              placeholder="Search by director name ..."
              allowClear
              style={{ width: "300px", height: 30 }}
            />
          </Col>
          <Col>
            <Select
              mode="multiple"
              allowClear
              placeholder="Search by actor name ..."
              onChange={handleChangeActor}
              options={options}
              style={{ width: '300px', maxHeight: '300px', overflow: 'auto' }}
            />
          </Col>
          <Col xs={24} md={12} lg={3} style={{ marginLeft: 100 }}>
            <Button type="primary" style={{ marginLeft: 10 }}>
              <Link to="/dotheanh/movie-details/movie-detail">New movie</Link>
            </Button>
          </Col>
        </Row>
      </div>
      <Table
        className="table table-striped mt-3"
        columns={columns}
        dataSource={movieDetails}
        rowKey="id"
        pagination={false}
        bordered
      />
      <Pagination
        style={{ marginTop: 50, justifyContent: 'center' }}
        className="pagination-container"
        current={currentPage}
        pageSize={pageSize}
        total={totalMovieDetail}
        onChange={handlePageChange}
        onShowSizeChange={handlePageSizeChange}
      />
    </>
  )
}

export default ListMovieDetail
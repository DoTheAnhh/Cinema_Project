import { useEffect, useState } from "react"
import axios from "axios"
import { Col, Input, Pagination, Row, Select, Space, Table, Tag, DatePicker, Button, Tooltip } from "antd"
import { Dayjs } from "dayjs"
import { Link, useNavigate } from "react-router-dom"
import { EditFilled, PlayCircleOutlined } from "@ant-design/icons";
import { Moviee, MovieTypee } from "../Types"
import { API, LOCALHOST, REQUEST_MAPPING } from "../APIs/typing"
const { RangePicker } = DatePicker;

const ListMovie: React.FC = () => {

  const [movies, setMovies] = useState<Moviee[]>([])

  const [searchTerm, setSearchTerm] = useState<string>("")

  const [movieType, setMovieType] = useState<string>("")

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalMovie, setTotalMovie] = useState<number>(0);

  const [movieTypes, setMovieTypes] = useState<MovieTypee[]>([])

  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null])

  const navigator = useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);

    if (value === "") {
      setCurrentPage(0);
    }
    handleSearch(value, movieType, dateRange, currentPage, pageSize);
  };

  const handleMovieTypeChange = (value: string) => {
    setMovieType(value);
    handleSearch(searchTerm, value, dateRange, currentPage, pageSize);
  };

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates) {
      setDateRange(dates);
      handleSearch(searchTerm, movieType, dates, currentPage, pageSize);
    } else {
      setDateRange([null, null]);
      handleSearch(searchTerm, movieType, [null, null], currentPage, pageSize);
    }
  };

  const handleSearch = async (
    searchMovieName: string,
    selectedMovieType: any,
    dateRange: [Dayjs | null, Dayjs | null],
    page: number,
    size: number
  ) => {
    try {
      let url = LOCALHOST + REQUEST_MAPPING.MOVIE + API.MOVIE.SEARCH_MOVIE + `?page=${page}&size=${size}`;

      if (searchMovieName) {
        url += `&movieName=${encodeURIComponent(searchMovieName)}`;
      }

      if (selectedMovieType) {
        selectedMovieType.forEach((type: any) => {
          url += `&movieType=${encodeURIComponent(type)}`;
        });
      }

      if (dateRange[0] && dateRange[1]) {
        url += `&fromDate=${dateRange[0].format('YYYY-MM-DD')}&toDate=${dateRange[1].format('YYYY-MM-DD')}`;
      }

      const res = await axios.get(url);
      setMovies(res.data.content); // Đảm bảo cập nhật dữ liệu cùng định dạng
      setTotalMovie(res.data.totalElements); // Cập nhật tổng số phần tử
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

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

  const fetchMovieType = async () => {
    try {
      const res = await axios.get<MovieTypee[]>(LOCALHOST + REQUEST_MAPPING.MOVIE_TYPE + API.MOVIE_TYPE.GETALL_MOVIE_TYPE);
      setMovieTypes(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchMovie(page, pageSize);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0);
    fetchMovie(0, size);
  };

  const editMovie = (id: number) => {
    navigator(`/dotheanh/movies/movie/${id}`);
  };

  useEffect(() => {
    fetchMovie(currentPage, pageSize).then((data) => {
      setMovies(data);
    });
  }, [currentPage, pageSize]);

  useEffect(() => {
    fetchMovieType();
  }, []);
  
  const options = movieTypes.map((type) => ({
    value: type.id.toString(),
    label: type.movieTypeName,
  }));

  const columns = [
    {
      title: "Banner",
      dataIndex: 'banner',
      key: "banner",
      align: "center" as const,
      render: (banner: any) => (
        <img
          src={banner}
          alt="Banner"
          style={{ width: '100px', height: '150px' }}
        />
      ),
    },
    {
      title: 'Movie name',
      dataIndex: 'movieName',
      key: 'movieName',
      align: "center" as const,
      render: (movieName: string) => <span style={{ fontWeight: 'bold', fontSize: '25px' }}>{movieName}</span>,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      align: "center" as const,
      render: (duration: number) => `${duration} Minutes`,
    },
    {
      title: 'Release date',
      dataIndex: 'releaseDate',
      key: 'releaseDate',
      align: "center" as const,
      render: (releaseDate: string) => {
        const date = new Date(releaseDate);
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        return formattedDate;
      },
    },
    
    {
      title: "Movie type",
      dataIndex: "movieTypes",
      key: "movieTypes",
      align: "center" as const,
      render: (movieTypes: any[]) =>
        movieTypes.map((type: any) => (
          <Tag color="green" key={type.movieTypeName} style={{ fontSize: '14px', padding: '6px 12px', margin: '4px' }}>
            {type.movieTypeName}
          </Tag>
        )),
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
      title: 'Ticket price',
      dataIndex: 'ticketPrice',
      key: 'ticketPrice',
      align: "center" as const,
      render: (price: number | string) => {
        const numericPrice = typeof price === 'string' ? parseInt(price, 10) : price;
        return `${numericPrice.toLocaleString('de-DE', { minimumFractionDigits: 0 })} VND`;
      }
    },
    {
      title: 'Trailer',
      dataIndex: 'trailer',
      key: 'trailer',
      align: "center" as const,
      render: (trailerUrl: string, record: Moviee) => (
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
    },
    {
      title: "Action",
      key: "action",
      align: "center" as const,
      render: (record: Moviee) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Tooltip title="Edit">
            <Button
              type="primary"
              onClick={() => editMovie(record.id)}
              icon={<EditFilled />}
            />
          </Tooltip>
        </div>
      ),
    }
  ]

  return (
    <>
      <div className="mt-3 mb-3">
        <Input
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search by movie name ..."
          allowClear
          style={{ width: "100%", height: 35 }}
        />
      </div>
      <div className="container mt-3">
        <Row gutter={[16, 16]} align="middle" style={{ marginTop: 20, marginBottom: 20, marginLeft: -8 }}>
          <Col xs={24} md={10} lg={3}>
            <Select
              mode="multiple"
              allowClear
              placeholder="Movie type"
              onChange={handleMovieTypeChange}
              options={options}
              style={{ width: '300px', maxHeight: '300px', overflow: 'auto' }}
            />
          </Col>
          <Col xs={24} md={12} lg={3} style={{ marginLeft: 250 }}>
            <Space direction="vertical" size={12}>
              <RangePicker
                style={{ width: 300, marginTop: -3 }}
                placeholder={['From date', 'To date']}
                onChange={handleDateChange}
              />
            </Space>
          </Col>
          <Col xs={24} md={12} lg={3} style={{ marginLeft: 500 }}>
            <Button type="primary" style={{ marginLeft: 10 }}>
              <Link to="/dotheanh/movies/movie">New movie</Link>
            </Button>
          </Col>
        </Row>
      </div>
      <Table
        className="table table-striped mt-3"
        columns={columns}
        dataSource={movies}
        rowKey="id"
        pagination={false}
        bordered
      />
      <Pagination
        style={{ marginTop: 50, justifyContent: 'center' }}
        className="pagination-container"
        current={currentPage}
        pageSize={pageSize}
        total={totalMovie}
        onChange={handlePageChange}
        onShowSizeChange={handlePageSizeChange}
      />
    </>
  )
}
export default ListMovie
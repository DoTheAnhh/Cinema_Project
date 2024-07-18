import { useEffect, useState } from "react"
import { Moviee, MovieType } from "../type"
import { API, LOCALHOST, REQUEST_MAPPING } from "../../APIs/typing"
import axios from "axios"
import { Col, Input, Pagination, Row, Select, Space, Table, Tag, DatePicker, Button, Tooltip } from "antd"
import { Dayjs } from "dayjs"
import { Link, useNavigate } from "react-router-dom"
import { EditFilled } from "@ant-design/icons";
const { RangePicker } = DatePicker;


const ListMovie: React.FC = () => {

  const [movies, setMovies] = useState<Moviee[]>([])

  const [searchTerm, setSearchTerm] = useState<string>("")

  const [movieType, setMovieType] = useState<string>("")

  const [currentPage, setCurrentPage] = useState<number>(0); // State để theo dõi trang hiện tại
  const [pageSize, setPageSize] = useState<number>(5); // Số mục trên mỗi trang
  const [totalMovie, setTotalMovie] = useState<number>(0); // Tổng số phần tử

  const [movieTypes, setMovieTypes] = useState<MovieType[]>([])

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
      setTotalMovie(res.data.totalElements); // Cập nhật tổng số phần tử
      return res.data.content; // Trả về mảng Employee[]
    } catch (error) {
      console.error("Error fetching data:", error);
      return []; // Trả về một mảng trống trong trường hợp lỗi
    }
  };

  const fetchMovieType = async () => {
    try {
      const res = await axios.get<MovieType[]>(LOCALHOST + REQUEST_MAPPING.MOVIE_TYPE + API.MOVIE_TYPE.GETALL_MOVIE_TYPE);
      setMovieTypes(res.data); // Cập nhật danh sách MovieType vào state
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
    navigator(`/dotheanh/movies/movie-detail/${id}`);
  };

  useEffect(() => {
    fetchMovie(currentPage, pageSize).then((data) => {
      const sortedMovie = data;
      setMovies(sortedMovie);
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
      title: "Action",
      key: "action",
      align: "center" as const,
      render: (record: Moviee) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Tooltip title="Edit">
            <Button
              type="primary"
              style={{ marginLeft: 10 }}
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
              <Link to="/dotheanh/movies/movie-detail">New movie</Link>
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
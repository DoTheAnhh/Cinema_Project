import { Button, Card, Carousel, Layout, theme } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import './css/index.css'
import { MovieDetaill } from '../Types';
import axios from 'axios';
import { API, LOCALHOST, REQUEST_MAPPING } from '../APIs/typing';
import { LikeFilled, EyeOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';


const User: React.FC = () => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const contentStyle: React.CSSProperties = {
    height: '450px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };

  const fontStyle: React.CSSProperties = {
    fontFamily: '"Noto Sans JP", sans-serif',
    fontSize: '13px',
    color: 'black'
  };

  const [movieDetails, setMovieDetails] = useState<MovieDetaill[]>([]);

  const fetchMovieDetails = async () => {
    try {
      const res = await axios.get(LOCALHOST + REQUEST_MAPPING.MOVIE_DETAIL + API.MOVIE_DETAIL.GETALL_MOVIE_DETAIL);
      setMovieDetails(res.data.content);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  useEffect(() => {
    fetchMovieDetails()
  }, [])
  
  return (
    <>
      <Layout>
        <Header style={{
          height: 80,
          padding: 0,
          background: colorBgContainer,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}>
          <img src="/src/assets/Logo.jpg" alt="Logo" style={{ position: 'absolute', left: 80, height: 80 }} />
          <ul style={{ width: 300, display: 'flex', justifyContent: 'space-between', listStyleType: 'none' }}>
            <li><a style={fontStyle} href="#new-movie">Phim mới</a></li>
            <li><a style={fontStyle} href="#cinema-corner" >Góc điện ảnh</a></li>
          </ul>
          <ul style={{ position: 'absolute', right: 80, display: 'flex', alignItems: 'center', listStyleType: 'none' }}>
            <li><a style={fontStyle} href="/">Đăng nhập</a></li>
            <li style={{ margin: '0 10px' }}>|</li>
            <li><a style={fontStyle} href="#">Đăng ký</a></li>
          </ul>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial', marginTop: 100 }}>
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Carousel autoplay style={{ width: '100%' }} arrows infinite={true}>
              <div style={contentStyle}>
                <img style={imageStyle} src="https://cdn.galaxycine.vn/media/2024/7/22/deadpool--wolverine-2048_1721640524779.jpg" alt="Slide 1" />
              </div>
              <div style={contentStyle}>
                <img style={imageStyle} src="https://cdn.galaxycine.vn/media/2024/7/19/hijack-1971-3_1721360507270.jpg" alt="Slide 2" />
              </div>
              <div style={contentStyle}>
                <img style={imageStyle} src="https://cdn.galaxycine.vn/media/2024/7/15/tham-tu-lung-danh-conan-ngoi-sao-5-canh-1-trieu-do-1_1721026295817.jpg" alt="Slide 3" />
              </div>
              <div style={contentStyle}>
                <img style={imageStyle} src="https://cdn.galaxycine.vn/media/2024/6/6/xummer-combo-2048x682_1717668878472.jpg" alt="Slide 4" />
              </div>
            </Carousel>
            <div id={"new-movie"}>
              <div>
                <h1 style={{
                  float: 'left',
                  marginTop: 50,
                  position: 'relative',
                  paddingLeft: 30,
                  fontFamily: 'Noto Sans JP", sans-serif',
                  fontSize: '24px',
                  marginLeft: 100,
                  marginBottom: 20,
                }}>
                  <span style={{
                    width: 10,
                    height: 20,
                    backgroundColor: 'blue',
                    display: 'inline-block',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}></span>
                  PHIM MỚI
                </h1>
              </div>
              <div style={{
                marginLeft: 50,
                width: 1300,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                justifyContent: 'space-evenly'
              }}>
                {movieDetails.slice(0, 8).map((m, index) => (
                  <Link to={`/movie-detail/${m.movies.id}`} key={index}>
                    <Card
                      key={index}
                      style={{ width: 250, border: 'none' }}
                      cover={<img alt="Movie" src={m.movies.banner} />}
                    >
                      <span style={{ fontSize: 20, fontWeight: 'bold' }}>{m.movies.movieName}</span>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <Button style={{ height: 40, width: 120, marginTop: 20 }}>Xem thêm</Button>
            </div>
            <div id={"cinema-corner"} style={{ marginTop: -120 }}>
              <div>
                <h1 style={{
                  float: 'left',
                  marginTop: 50,
                  position: 'relative',
                  paddingLeft: 30,
                  fontFamily: 'Noto Sans JP", sans-serif',
                  fontSize: '24px',
                  marginLeft: 100
                }}>
                  <span style={{
                    width: 10,
                    height: 20,
                    backgroundColor: 'blue',
                    display: 'inline-block',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}></span>
                  GÓC ĐIỆN ẢNH
                </h1>
                <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '100px' }}>
                  <div style={{ width: '500px', marginTop: 100, marginLeft: -200 }}>
                    <img
                      style={{ width: '120%', height: 'auto' }}
                      src="https://www.galaxycine.vn/media/2024/7/18/my-boo-rv-750_1721274670938.jpg"
                      alt="Review"
                    />
                    <h3 style={{ marginTop: '20px', fontWeight: 'bold' }}>
                      [Review] My Boo: "Tình Người Duyên Ma" Phiên Bản Tươi Sáng
                    </h3>
                    <div style={{ marginRight: 320 }}>
                      <Button icon={<LikeFilled />} type='primary' style={{ marginTop: '10px', height: '25px' }}>
                        Thích
                      </Button>
                      <Button icon={<EyeOutlined />} type='default' style={{ marginTop: '10px', marginLeft: '10px', height: '25px' }}>
                        100
                      </Button>
                    </div>
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ width: '100%' }}>
                      <img
                        style={{ width: 200, height: 'auto', marginRight: 300, marginTop: 100 }}
                        src="https://www.galaxycine.vn/media/2024/7/10/despicable-me-4-minions---vo-tri-huong-ti-do-2_1720597464019.jpg"
                        alt="Review"
                      />
                      <h3 style={{ marginTop: '-130px', marginLeft: 350, fontWeight: 'bold' }}>
                        [Review] Despicable Me 4: Minions - "Vô Tri" Hưởng Tỉ Đô?
                      </h3>
                      <div style={{ marginRight: -120 }}>
                        <Button icon={<LikeFilled />} type='primary' style={{ marginTop: '10px', height: '25px' }}>
                          Thích
                        </Button>
                        <Button icon={<EyeOutlined />} type='default' style={{ marginTop: '10px', marginLeft: '10px', height: '25px' }}>
                          100
                        </Button>
                      </div>
                    </div>
                    <div style={{ width: '100%' }}>
                      <img
                        style={{ width: 200, height: 'auto', marginRight: 300, marginTop: 100 }}
                        src="https://www.galaxycine.vn/media/2024/6/30/a-quiet-place-day-one-ngay-new-york-thanh-vung-dat-chet-2_1719726875743.jpg"
                        alt="Review"
                      />
                      <h3 style={{ marginTop: '-130px', marginLeft: 350, fontWeight: 'bold' }}>
                        [Review] A Quiet Place Day One: Ngày New York Thành Vùng Đất Chết
                      </h3>
                      <div style={{ marginRight: -120 }}>
                        <Button icon={<LikeFilled />} type='primary' style={{ marginTop: '10px', height: '25px' }}>
                          Thích
                        </Button>
                        <Button icon={<EyeOutlined />} type='default' style={{ marginTop: '10px', marginLeft: '10px', height: '25px' }}>
                          100
                        </Button>
                      </div>
                    </div>
                    <div style={{ width: '100%' }}>
                      <img
                        style={{ width: 200, height: 'auto', marginRight: 300, marginTop: 100 }}
                        src="https://www.galaxycine.vn/media/2024/7/5/deadpool--wolverine-du-suc-vuc-day-vu-tru-dien-anh-marvel-2_1720176204536.jpg"
                        alt="Review"
                      />
                      <h3 style={{ marginTop: '-130px', marginLeft: 350, fontWeight: 'bold' }}>
                        [Preview] Deadpool & Wolverine: Đủ Sức Vực Dậy Vũ Trụ Điện Ảnh Marvel?
                      </h3>
                      <div style={{ marginRight: -120 }}>
                        <Button icon={<LikeFilled />} type='primary' style={{ marginTop: '10px', height: '25px' }}>
                          Thích
                        </Button>
                        <Button icon={<EyeOutlined />} type='default' style={{ marginTop: '10px', marginLeft: '10px', height: '25px' }}>
                          100
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©{new Date().getFullYear()}
        </Footer>
      </Layout >
    </>
  );
}

export default User;

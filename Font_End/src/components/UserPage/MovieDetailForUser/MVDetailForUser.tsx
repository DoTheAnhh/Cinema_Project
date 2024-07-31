import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LOCALHOST, REQUEST_MAPPING, API } from '../../APIs/typing';
import { MovieDetaill, Moviee } from '../../Types';
import { Button, Layout, Select, Tag, theme } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { FieldTimeOutlined, CalendarOutlined, FacebookOutlined, YoutubeOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface DateObject {
    day: string;
    date: string;
}

const MVDetailForUser: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movies, setMovies] = useState<Moviee>();

    const [selectedDate, setSelectedDate] = useState<DateObject | null>(null);

    const totalDays = 6; // Tổng số ngày muốn hiển thị
    const daysToShow = 4; // Số ngày muốn hiển thị trên mỗi trang

    const handleTagClick = (dateObj: DateObject) => {
        setSelectedDate(dateObj);
    };

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const fontStyle: React.CSSProperties = {
        fontFamily: '"Noto Sans JP", sans-serif',
        fontSize: '13px',
        color: 'black'
    };

    const tagStyle = {
        fontSize: '14px',
        padding: '5px 10px',
        margin: '5px',
        borderRadius: '10px',
    };

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await axios.get(`${LOCALHOST}${REQUEST_MAPPING.MOVIE + API.MOVIE.GETALL_MOVIE}/${id}`);
                setMovies(res.data);
            } catch (error) {
                console.error('Error fetching movie detail:', error);
            }
        };

        fetchMovie();
    }, [id]);


    const generateNextDays = (days: number) => {
        const today = dayjs();
        return Array.from({ length: days }, (_, index) => {
            const date = today.add(index, 'day');
            return {
                day: date.format('dddd'), // Lấy thứ trong tuần
                date: date.format('DD/MM')
            };
        });
    };

    const allDays = generateNextDays(totalDays);

    const NextArrow = (props: any) => {
        const { className, style, onClick } = props;
        return (
            <Button
                className={className}
                style={{ ...style, display: 'block', backgroundColor: 'black' }}
                onClick={onClick}
            />
        );
    };

    const PrevArrow = (props: any) => {
        const { className, style, onClick } = props;
        return (
            <Button
                className={className}
                style={{ ...style, display: 'block', backgroundColor: 'black' }}
                onClick={onClick}
            />
        );
    };

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: daysToShow,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

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
                <Content style={{ margin: '24px 0', overflow: 'initial', marginTop: 100 }}>
                    <div
                        style={{
                            padding: 24,
                            textAlign: 'center',
                            borderRadius: borderRadiusLG,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: -20,
                            height: 500,
                            background: 'black',
                        }}
                    >
                        <iframe
                            src={movies?.trailer}
                            style={{ height: 503, width: 750, flexShrink: 0 }}
                            title="Movie Trailer"
                        ></iframe>
                    </div>
                    <div style={{ display: 'flex', marginTop: 25 }}>
                        <img
                            style={{ height: 350, width: 240, borderRadius: 5, marginTop: -90, marginLeft: 200 }}
                            src={movies?.banner}
                            alt={movies?.movieName}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 30, marginTop: -500 }}>
                            <h1 style={{ marginBottom: 10 }}>{movies?.movieName}</h1>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px',
                                marginBottom: 20
                            }}>
                                <p><FieldTimeOutlined style={{ color: 'orange' }} /> {movies?.duration + " Phút"}</p>
                                <p><CalendarOutlined style={{ color: 'orange' }} /> {movies?.releaseDate
                                    ? dayjs(movies.releaseDate).format('DD/MM/YYYY')
                                    : 'No release date available'}</p>
                            </div>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <strong style={{ marginRight: '5px' }}>Thể loại</strong>:
                                    {movies?.movieTypes.map((type, index) => (
                                        <Tag key={index} style={tagStyle}>{type.movieTypeName}</Tag>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                                    <strong style={{ marginRight: '5px' }}>Đạo diễn</strong>:
                                    <Tag style={tagStyle}>{movies?.directorName}</Tag>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                                    <strong style={{ marginRight: '5px' }}>Diễn viên</strong>:
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', maxWidth: '100%' }}>
                                        {movies?.actors.map((actor: any, index: any) => (
                                            <Tag key={index} style={tagStyle}>{actor.actorName}</Tag>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginLeft: 120, marginTop: -50 }}>
                            <h2 style={{
                                float: 'left',
                                marginTop: 50,
                                position: 'relative',
                                paddingLeft: 30,
                                fontFamily: 'Noto Sans JP", sans-serif',
                                fontSize: '18px',
                                marginLeft: 100,
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
                                Phim đang chiếu
                            </h2>
                            <div style={{ marginLeft: 100 }}>
                                <div>
                                    <img src='https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/353CC6E434CA544C677596ACDDE553B762C4D4E49E52F36B4C3205EA49CFA8DD/scale?width=1200&amp;aspectRatio=1.78&amp;format=webp' height={200} width={300} style={{ marginTop: 20 }} />
                                    <div style={{ marginTop: 10 }}>
                                        Deadpool & Wolverine
                                    </div>
                                </div>
                                <div>
                                    <img src='https://cdn.mobilecity.vn/mobilecity-vn/images/2024/07/review-phim-ke-trom-mat-trang-4-su-quay-pha-cua-minion.jpg.webp' height={200} width={300} style={{ marginTop: 20 }} />
                                    <div style={{ marginTop: 10 }}>
                                        Kẻ Trộm Mặt Trăng 4
                                    </div>
                                </div>
                                <div>
                                    <img src='https://cdn.mobilecity.vn/mobilecity-vn/images/2024/07/review-phim-du-an-mat-tham-hoa-tren-cau-su-doan-ket.jpg.webp' height={200} width={300} style={{ marginTop: 20 }} />
                                    <div style={{ marginTop: 10 }}>
                                        Thảm họa trên cầu
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginLeft: 280 }}>
                                <Button style={{ borderColor: 'orange', width: 120, height: 40, color: 'orange' }}>Xem thêm</Button>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginLeft: 100, width: 700, marginTop: -500 }}>
                        <h3 style={{
                            float: 'left',
                            marginTop: 50,
                            position: 'relative',
                            paddingLeft: 30,
                            fontFamily: 'Noto Sans JP", sans-serif',
                            fontSize: '18px',
                            marginLeft: 100,
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
                            Nội dung phim
                        </h3>
                    </div>
                    <div style={{ width: 720, marginTop: 90, marginLeft: 200, gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
                        {movies?.content}
                    </div>

                    <div style={{ marginLeft: 100 }}>
                        <h3 style={{
                            float: 'left',
                            marginTop: 50,
                            position: 'relative',
                            paddingLeft: 30,
                            fontFamily: 'Noto Sans JP", sans-serif',
                            fontSize: '18px',
                            marginLeft: 100,
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
                            Lịch chiếu
                        </h3>
                    </div>
                    <div style={{ marginTop: 80, marginLeft: 220, width: 500, display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: 350 }}>
                            <Slider {...settings}>
                                {allDays.map((dateObj, index) => (
                                    <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Tag
                                            style={{
                                                padding: '10px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                border: 'none',
                                                backgroundColor: selectedDate?.date === dateObj.date ? '#03346E' : 'transparent',
                                                color: selectedDate?.date === dateObj.date ? 'white' : 'black',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => handleTagClick(dateObj)}
                                        >
                                            <div style={{ fontSize: 14 }}>{dateObj.day}</div>
                                            <div style={{ fontSize: 14 }}>{dateObj.date}</div>
                                        </Tag>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', marginLeft: '50px' }}>
                            <Select
                                defaultValue="Toàn quốc"
                                style={{ width: 145 }}
                                allowClear
                                options={[
                                    {
                                        value: 'Toàn quốc',
                                        label: 'Toàn quốc'
                                    }
                                ]}
                            />
                            <Select
                                defaultValue="Tất cả rạp"
                                style={{ width: 145 }}
                                allowClear
                                options={[
                                    {
                                        value: 'Tất cả rạp',
                                        label: 'Tất cả rạp'
                                    }
                                ]}
                            />
                        </div>
                    </div>
                    <div style={{ marginTop: -87 }}>
                        {selectedDate ? (
                            `${selectedDate.day}, ${selectedDate.date}`
                        ) : (
                            'Chưa chọn ngày.'
                        )}
                    </div>
                    <hr style={{ marginTop: 80, width: 725, justifyContent: 'center', marginLeft: 195, height: 2, backgroundColor: 'blue' }} />
                    <div className="container table" style={{ marginLeft: 180 }}>
                        <div className="row">
                            <div className="col-12 mb-3" style={{
                                marginTop: 20, fontWeight: 'bold', fontFamily: 'Noto Sans JP, sans-serif',
                                fontSize: '18px',
                            }}>
                                Quang Trung
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 20 }}>
                                <Tag style={{
                                    width: 90,
                                    height: 35,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '14px'
                                }}>
                                    20:30
                                </Tag>
                                <Tag style={{
                                    width: 90,
                                    height: 35,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '14px'
                                }}>
                                    21:30
                                </Tag>
                                <Tag style={{
                                    width: 90,
                                    height: 35,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '14px'
                                }}>
                                    22:30
                                </Tag>
                            </div>
                        </div>
                    </div>
                </Content>
                <Footer style={{ width: '100%', backgroundColor: '#333333', display: 'flex', justifyContent: 'space-between', padding: '0 140px' }}>
                    <div style={{ color: '#FFF5D1', flex: 1, marginTop: 40, marginLeft: 40, marginRight: 200 }}>
                        <div style={{ fontWeight: 'normal', fontSize: 20, marginBottom: 40, }}>Giới thiệu</div>
                        <div>
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                <li style={{ marginBottom: 20 }}>Về chúng tôi</li>
                                <li style={{ marginBottom: 20 }}>Thỏa thuận sử dụng</li>
                                <li style={{ marginBottom: 20 }}>Cơ chế hoạt động</li>
                                <li style={{ marginBottom: 20 }}>Chính sách bảo mật</li>
                            </ul>
                        </div>
                    </div>
                    <div style={{ color: '#FFF5D1', flex: 1, marginTop: 40, marginRight: 200 }}>
                        <div style={{ fontWeight: 'normal', fontSize: 20, marginBottom: 40 }}>Góc điện ảnh</div>
                        <div>
                            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                <li style={{ marginBottom: 20 }}>Thể loại phim</li>
                                <li style={{ marginBottom: 20 }}>Bình luận phim</li>
                                <li style={{ marginBottom: 20 }}>Blog điện ảnh</li>
                                <li style={{ marginBottom: 20 }}>Phim hay tháng</li>
                                <li style={{ marginBottom: 20 }}>Phim IMAX</li>
                            </ul>
                        </div>
                    </div>
                    <div style={{ color: '#FFF5D1', flex: 1, marginTop: 40, marginRight: 200 }}>
                        <div style={{ fontWeight: 'normal', fontSize: 20, marginBottom: 40 }}>Hỗ trợ</div>
                        <div>
                            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                <li style={{ marginBottom: 20 }}>Góp ý</li>
                                <li style={{ marginBottom: 20 }}>Sale & Services</li>
                                <li style={{ marginBottom: 20 }}>Rạp/Giá vé</li>
                                <li style={{ marginBottom: 20 }}>Tuyển dụng</li>
                                <li style={{ marginBottom: 20 }}>FQA</li>
                            </ul>
                        </div>
                    </div>
                    <div style={{ color: '#FFF5D1', flex: 1, marginTop: 240, marginLeft: 50 }}>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div style={{ fontSize: '32px', marginLeft: -100 }}>
                                <FacebookOutlined />
                            </div>
                            <div style={{ fontSize: '32px', marginLeft: 50 }}>
                                <YoutubeOutlined />
                            </div>
                        </div>
                    </div>
                </Footer>
            </Layout >
        </>
    );
};

export default MVDetailForUser;

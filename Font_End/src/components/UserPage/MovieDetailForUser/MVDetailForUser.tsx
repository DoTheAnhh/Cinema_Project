import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LOCALHOST, REQUEST_MAPPING, API } from '../../APIs/typing';
import { MovieDetaill } from '../../Types';
import { Button, Layout, Select, Tag, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { FieldTimeOutlined, CalendarOutlined } from "@ant-design/icons";
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
    const [movieDetails, setMovieDetails] = useState<MovieDetaill>();

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
        const fetchMovieDetail = async () => {
            try {
                const res = await axios.get(`${LOCALHOST}${REQUEST_MAPPING.MOVIE_DETAIL + API.MOVIE_DETAIL.GETALL_MOVIE_DETAIL}/${id}`);
                setMovieDetails(res.data);
            } catch (error) {
                console.error('Error fetching movie detail:', error);
            }
        };

        fetchMovieDetail();
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
                            src={movieDetails?.trailer}
                            style={{ height: 503, width: 750, flexShrink: 0 }}
                            title="Movie Trailer"
                        ></iframe>
                    </div>

                    <div style={{ display: 'flex', marginTop: 25 }}>
                        <img
                            style={{ height: 350, width: 240, borderRadius: 5, marginTop: -90, marginLeft: 200 }}
                            src={movieDetails?.movies.banner}
                            alt={movieDetails?.movies.movieName}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: 30 }}>
                            <h1 style={{ marginBottom: 10 }}>{movieDetails?.movies.movieName}</h1>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px',
                                marginBottom: 20
                            }}>
                                <p><FieldTimeOutlined style={{ color: 'orange' }} /> {movieDetails?.movies.duration + " Phút"}</p>
                                <p><CalendarOutlined style={{ color: 'orange' }} /> {movieDetails?.movies.releaseDate
                                    ? dayjs(movieDetails.movies.releaseDate).format('DD/MM/YYYY')
                                    : 'No release date available'}</p>
                            </div>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <strong style={{ marginRight: '5px' }}>Thể loại</strong>:
                                    {movieDetails?.movies.movieTypes.map((type, index) => (
                                        <Tag key={index} style={tagStyle}>{type.movieTypeName}</Tag>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                                    <strong style={{ marginRight: '5px' }}>Đạo diễn</strong>:
                                    <Tag style={tagStyle}>{movieDetails?.directorName}</Tag>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                                    <strong style={{ marginRight: '5px' }}>Diễn viên</strong>:
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', maxWidth: '100%' }}>
                                        {movieDetails?.actors.map((actor, index) => (
                                            <Tag key={index} style={tagStyle}>{actor.actorName}</Tag>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginLeft: 100, width: 700 }}>
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
                    <div style={{ width: 800, marginTop: 90, marginLeft: 200 }}>
                        {movieDetails?.content}
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
                    <div style={{ marginTop: 80, marginLeft: 220, width: 600, display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: 460 }}>
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
                    <hr style={{ marginTop: 80, width: 850, justifyContent: 'center', marginLeft: 195, height: 2, backgroundColor: 'blue' }} />

                </Content>
            </Layout >
        </>
    );
};

export default MVDetailForUser;

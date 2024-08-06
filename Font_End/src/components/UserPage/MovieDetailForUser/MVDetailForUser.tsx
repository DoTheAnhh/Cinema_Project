import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { LOCALHOST, REQUEST_MAPPING, API } from '../../APIs/typing';
import { Moviee, ShowTimee} from '../../Types';
import { Button, Layout, Select, Tag, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { FieldTimeOutlined, CalendarOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserHeader from '../Header/UserHeader';
import UserFooter from '../Footer/UserFooter';

interface DateObject {
    day: string;
    date: string;
}

const MVDetailForUser: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const [movies, setMovies] = useState<Moviee>();
    const [showTimes, setShowTimes] = useState<ShowTimee[]>([]);
    const [selectedTheater, setSelectedTheater] = useState<string | null>(null);

    const [selectedDate, setSelectedDate] = useState<DateObject | null>(null);

    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const navigate = useNavigate();

    const totalDays = 6; // Tổng số ngày muốn hiển thị
    const daysToShow = 4; // Số ngày muốn hiển thị trên mỗi trang

    const handleTagClick = async (dateObj: DateObject) => {
        setSelectedDate(dateObj);
        await fetchShowTime(dateObj.date); // Gọi fetchShowTime với ngày được chọn
    };

    const {
        token: { borderRadiusLG },
    } = theme.useToken();

    const tagStyle = {
        fontSize: '14px',
        padding: '5px 10px',
        margin: '5px',
        borderRadius: '10px',
    };

    const fetchMovie = async () => {
        try {
            const res = await axios.get(`${LOCALHOST}${REQUEST_MAPPING.MOVIE + API.MOVIE.GETALL_MOVIE}/${id}`);
            setMovies(res.data);
        } catch (error) {
            console.error('Error fetching movie detail:', error);
        }
    };

    const fetchShowTime = async (date: string) => {
        try {
            const formattedDate = dayjs(date, 'DD/MM').format('YYYY-MM-DD');
            const res = await axios.get(`${LOCALHOST}${REQUEST_MAPPING.SHOW_TIME}${API.SHOW_TIME.GETALL_SHOW_TIME}/movie/${id}/date/${formattedDate}`);
            setShowTimes(res.data);
            console.log(res.data);
        } catch (error) {
            console.error('Error fetching movie detail:', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchMovie();
            // Gọi fetchShowTime với ngày mặc định hoặc ngày được chọn
            if (selectedDate) {
                fetchShowTime(selectedDate.date);
            } else {
                // Nếu chưa có ngày được chọn, có thể sử dụng ngày hôm nay hoặc một giá trị mặc định khác
                fetchShowTime(dayjs().format('DD/MM'));
            }
        }
    }, [id, selectedDate]);

    const generateNextDays = (days: number) => {
        const today = dayjs();
        return Array.from({ length: days }, (_, index) => {
            const date = today.add(index, 'day');
            return {
                day: date.format('dddd'), // Lấy thứ trong tuần
                date: date.format('DD/MM') // Ngày định dạng DD/MM
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

    const groupedShowTimes: { [key: string]: string[] } = showTimes.reduce((acc, showTime) => {
        const theaterName = showTime.cinemaRoom.theaters.theaterName;
        if (!acc[theaterName]) {
            acc[theaterName] = [];
        }
        acc[theaterName].push(showTime.showTime);
        return acc;
    }, {} as { [key: string]: string[] });

    const getEmbedUrl = (url: string) => {
        if (url.includes('watch?v=')) {
            return url.replace('watch?v=', 'embed/');
        } else if (url.includes('youtu.be/')) {
            return url.replace('youtu.be/', 'www.youtube.com/embed/');
        } else {
            return null;
        }
    };

    const handleTimeClick = (theaterName: string, time: string) => {
        navigate('/cinema-room-booking', {
            state: {
                selectedTheater: theaterName,
                showTimes: showTimes.filter(st => st.cinemaRoom.theaters.theaterName === theaterName),
                selectedTime: time // Pass the selected time
            }
        });
    };
    
    const embedUrl = movies?.trailer ? getEmbedUrl(movies.trailer) : null;

    return (
        <>
            <Layout>
                <UserHeader />
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
                        {embedUrl ? (
                            <iframe
                                src={embedUrl}
                                style={{ height: 500, width: 800, flexShrink: 0, border: 'none', pointerEvents: 'auto', position: 'relative' }}
                                title="Movie Trailer"
                                allowFullScreen
                                frameBorder="0"
                            ></iframe>
                        ) : (
                            <p>No trailer available</p>
                        )}
                    </div>
                    <div style={{ display: 'flex', marginTop: 25 }}>
                        <img
                            style={{ height: 350, width: 240, borderRadius: 5, marginTop: -90, marginLeft: 200, position: 'relative' }}
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
                    <div style={{ width: 800, marginTop: 90, marginLeft: 200, gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
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
                    <div style={{ marginTop: 80, marginLeft: 220, width: 600, display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: 430 }}>
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
                    <hr style={{ marginTop: 30, width: 800, justifyContent: 'center', marginLeft: 195, height: 2, backgroundColor: 'blue' }} />
                    <div className="container table" style={{ marginLeft: 200 }}>
                        {Object.entries(groupedShowTimes).map(([theaterName, times]: [string, string[]], i: number) => (
                            <div key={i} className="col-12 mb-3" style={{ marginTop: 20 }}>
                                <div style={{
                                    fontWeight: 'bold',
                                    fontFamily: 'Noto Sans JP, sans-serif',
                                    fontSize: '18px',
                                }}>
                                    {theaterName}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 20 }}>
                                    {times
                                        .map(time => dayjs(time, 'HH:mm'))
                                        .sort((a, b) => a.isBefore(b) ? -1 : 1)
                                        .map((time, j) => (
                                            <Button
                                                key={j}
                                                style={{
                                                    width: 90,
                                                    height: 35,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '14px',
                                                    margin: '4px'
                                                }}
                                                onClick={() => handleTimeClick(theaterName, time.format('HH:mm'))}
                                            >
                                                {time.format('HH:mm')}
                                            </Button>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Content>
                <UserFooter />
            </Layout >
        </>
    );
};

export default MVDetailForUser;

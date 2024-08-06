import React, { useEffect, useState } from 'react';
import UserHeader from '../Header/UserHeader';
import dayjs from 'dayjs';
import { Tag } from 'antd';
import { ShowTimee } from '../../Types';
import { API, LOCALHOST, REQUEST_MAPPING } from '../../APIs/typing';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface DateObject {
    day: string;
    date: string;
}

const SeatBooking: React.FC = () => {
    const [showTimes, setShowTimes] = useState<ShowTimee[]>([]);
    const [selectedDate, setSelectedDate] = useState<DateObject | null>(null);
    const { id } = useParams<{ id: string }>();

    const handleTagClick = async (dateObj: DateObject) => {
        setSelectedDate(dateObj);
        await fetchShowTime(dateObj.date);
    };

    const fetchShowTime = async (date: string) => {
        try {
            const formattedDate = dayjs(date, 'DD/MM').format('YYYY-MM-DD');
            //const res = await axios.get(`${LOCALHOST}${REQUEST_MAPPING.SHOW_TIME}${API.SHOW_TIME.GETALL_SHOW_TIME}/movie/${id}/date/${formattedDate}`);
            const res = await axios.get(`${LOCALHOST}${REQUEST_MAPPING.SHOW_TIME}${API.SHOW_TIME.GETALL_SHOW_TIME}/movie/1/date/2024-08-07`);
            setShowTimes(res.data);
            console.log(res.data);
        } catch (error) {
            console.error('Error fetching movie detail:', error);
        }
    };

    const groupedShowTimes: { [key: string]: string[] } = showTimes.reduce((acc, showTime) => {
        const theaterName = showTime.cinemaRoom.theaters.theaterName;
        if (!acc[theaterName]) {
            acc[theaterName] = [];
        }
        acc[theaterName].push(showTime.showTime);
        return acc;
    }, {} as { [key: string]: string[] });

    useEffect(() => {
        if (selectedDate) {
            fetchShowTime(selectedDate.date);
        } else {
            fetchShowTime(dayjs().format('DD/MM'));
        }

    }, [id, selectedDate]);

    return (
        <>
            <div style={{ backgroundColor: '#F9F9F9F9' }}>
                <UserHeader />
                <div style={{ marginLeft: 200, width: 760, height: 120, marginTop: 100,backgroundColor: '#FFFFFF' }}>
                    
                    {Object.entries(groupedShowTimes).map(([theaterName, times], i) => (
                        <div key={i} className="col-12 mb-3" style={{ padding: 20 }}>
                            <div style={{
                                fontWeight: 'bold',
                                fontFamily: 'Noto Sans JP, sans-serif',
                                fontSize: '12px',
                                paddingBottom: 10
                            }}>Đổi suất chiếu</div>
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
                                        <Tag key={j} style={{
                                            width: 90,
                                            height: 35,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '14px'
                                        }}>
                                            {time.format('HH:mm')}
                                        </Tag>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='seat'>

                </div>
            </div>
        </>
    );
}

export default SeatBooking;

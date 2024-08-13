import React, { useEffect, useState } from 'react'
import UserHeader from '../../../Header/UserHeader'
import UserFooter from '../../../Footer/UserFooter'
import { Foodd } from '../../../../Types'
import axios from 'axios'
import { API, LOCALHOST, REQUEST_MAPPING } from '../../../../APIs/typing'
import MovieInfo from '../MovieInfo'
import { useNavigate } from 'react-router-dom'
import './css/FoodSelected.css'

const FoodSelected: React.FC = () => {
    const [foods, setFoods] = useState<Foodd[]>([]);
    const [movieData, setMovieData] = useState<any>(null);
    const [quantities, setQuantities] = useState<number[]>([]);
    const navigator = useNavigate()

    const handleIncrease = (index: number) => {
        setQuantities(prevQuantities =>
            prevQuantities.map((quantity, i) => i === index ? quantity + 1 : quantity)
        );
    };

    const handleDecrease = (index: number) => {
        setQuantities(prevQuantities =>
            prevQuantities.map((quantity, i) => (i === index && quantity > 0) ? quantity - 1 : quantity)
        );
    };

    const fetchFoods = async () => {
        const res = await axios.get(LOCALHOST + REQUEST_MAPPING.FOOD + API.FOOD.GET_ALL_FOOD);
        setFoods(res.data);
        setQuantities(res.data.map(() => 0));
    };

    useEffect(() => {
        const storedData = sessionStorage.getItem('movieBookingData');
        if (storedData) {
            setMovieData(JSON.parse(storedData));
        }
        fetchFoods();
    }, []);

    return (
        <>
            <UserHeader />
            <div style={{ display: 'flex', marginLeft: 150, marginTop: 120, fontFamily: 'Noto Sans JP, sans-serif' }}>
                <div style={{ marginTop: 50, marginRight: 1000 }}>
                    <h3 style={{ paddingBottom: 20, width: 200 }}>Chọn đồ ăn, uống</h3>
                    <div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {foods.map((food, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', flexWrap: 'nowrap' }}>
                                    <img src={food.image} style={{ height: 100, width: 100, marginRight: '20px' }} alt={food.foodName} />
                                    <div style={{ marginTop: -30 }}>
                                        <div style={{ marginTop: 20 }}>
                                            <strong style={{ fontSize: 20 }}>{food.foodName}</strong>
                                        </div>
                                        <div style={{ marginTop: 10 }}>
                                            <strong>
                                                Giá: {parseFloat(food.price).toLocaleString('vi-VN', {
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0
                                                })} VNĐ
                                            </strong>
                                        </div>

                                        <div style={{ marginTop: 10 }}>
                                            Số lượng còn: {food.quantity}
                                        </div>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        border: '1px solid #ddd',
                                        borderRadius: '5px',
                                        padding: '5px',
                                        width: '100px',
                                        justifyContent: 'space-between',
                                        marginLeft: 'auto',
                                        marginRight: -550
                                    }}>
                                        <button onClick={() => handleDecrease(index)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                                            -
                                        </button>
                                        <span>{quantities[index]}</span>
                                        <button onClick={() => handleIncrease(index)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div style={{ marginLeft: -350 }}>
                    <MovieInfo
                        banner={movieData?.banner}
                        movieName={movieData?.movieName}
                        selectedTheater={movieData?.selectedTheater}
                        cinemaRoom={movieData?.cinemaRoom}
                        currentSelectedTime={movieData?.currentSelectedTime}
                        selectedSeats={new Set(movieData?.selectedSeats)}
                        seats={movieData?.seats}
                        currentTicketPrice={movieData?.currentTicketPrice}
                        foods={foods}
                        quantities={quantities}
                        backToHome={() => navigator('/user')}
                        handleContinue={() => { }}
                    />
                </div>
            </div>
            <UserFooter />
        </>
    );
}

export default FoodSelected;

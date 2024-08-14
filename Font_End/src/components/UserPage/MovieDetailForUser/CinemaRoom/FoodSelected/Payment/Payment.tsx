import React, { useEffect, useState } from 'react';
import UserHeader from '../../../../Header/UserHeader';
import UserFooter from '../../../../Footer/UserFooter';
import { Button, Input, message } from 'antd';
import MovieInfo from '../../MovieInfo';
import { Foodd } from '../../../../../Types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Payment: React.FC = () => {
    const [movieData, setMovieData] = useState<any>(null);
    const [foods, setFoods] = useState<Foodd[]>([]);
    const [quantities, setQuantities] = useState<number[]>([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const storedData = sessionStorage.getItem('movieBookingData');
        if (storedData) {
            setMovieData(JSON.parse(storedData));
        }

        const storedFoods = sessionStorage.getItem('selectedFoods');
        if (storedFoods) {
            setFoods(JSON.parse(storedFoods));
        }

        const storedQuantities = sessionStorage.getItem('selectedQuantities');
        if (storedQuantities) {
            setQuantities(JSON.parse(storedQuantities));
        }
    }, []);

    const handlePaymentMethodChange = (method: string) => {
        setSelectedPaymentMethod(method);
        setErrorMessage(null);
    };

    const calculateTotalPrice = () => {
        const totalFoodPrice = foods.reduce((total, food, index) => {
            return quantities[index] > 0 ? total + (quantities[index] * parseFloat(food.price)) : total;
        }, 0);

        const totalTicketPrice = (movieData?.selectedSeats?.length || 0) * (movieData?.currentTicketPrice || 0);

        return totalTicketPrice + totalFoodPrice;
    };

    const handleContinue = async () => {
        const totalPrice = calculateTotalPrice();

        if (!selectedPaymentMethod) {
            message.error('Vui lòng chọn phương thức thanh toán!');
            return;
        }

        if (selectedPaymentMethod === 'VNPAY') {
            try {
                const amount = totalPrice;
                const orderInfo = 'Thanh toán vé xem phim';
                const url = `http://localhost:8080/submitOrder?amount=${encodeURIComponent(amount)}&orderInfo=${orderInfo}`;

                const response = await axios.post(url);

                window.location.href = response.data;

            } catch (error) {
                console.error('Lỗi khi tạo URL thanh toán VNPay:', error);
                setErrorMessage('Đã xảy ra lỗi trong quá trình tạo URL thanh toán.');
            }
        }
    };
    
    const backToHome = () => {
        sessionStorage.removeItem('selectedFoods');
        sessionStorage.removeItem('selectedQuantities');
        navigate('/food-selected');
    };
    
    return (
        <>
            <UserHeader />
            <div style={{ display: 'flex', marginLeft: 200, marginTop: 120, fontFamily: 'Noto Sans JP, sans-serif' }}>
                <div style={{ marginTop: 50, marginRight: 1000 }}>
                    <h3 style={{ paddingBottom: 20, width: 200 }}>Khuyến mãi</h3>
                    <div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ paddingBottom: 10 }}><strong>Mã khuyến mãi</strong></div>
                            <div style={{ display: 'flex' }}>
                                <Input style={{ height: 40, width: 300 }} />
                                <Button style={{ marginLeft: 20, backgroundColor: 'orange', height: 40, width: 120, color: 'white' }}>Áp dụng</Button>
                            </div>
                            <div style={{ paddingTop: 10 }}>
                                <strong>Khuyến mãi của bạn</strong>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 style={{ paddingBottom: 20, width: 500, marginTop: 80 }}>Phương thức thanh toán</h3>
                        <div style={{ display: 'flex' }}>
                            <input
                                type="radio"
                                name="pay"
                                style={{ marginRight: 20 }}
                                onChange={() => handlePaymentMethodChange('MoMo')}
                            />
                            <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" width="50" height="50" alt="MoMo" />
                            <div style={{ marginTop: 15, marginLeft: 30 }}>Ví Điện Tử MoMo</div>
                        </div>
                        <div style={{ display: 'flex', marginTop: 15 }}>
                            <input
                                type="radio"
                                name="pay"
                                style={{ marginRight: 20 }}
                                onChange={() => handlePaymentMethodChange('VNPAY')}
                            />
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s" width="50" height="50" alt="VNPAY" />
                            <div style={{ marginTop: 15, marginLeft: 30 }}>VNPAY</div>
                        </div>
                    </div>
                    {errorMessage && <div style={{ color: 'red', marginTop: 20 }}>{errorMessage}</div>}
                </div>
                <div style={{ marginLeft: -700 }}>
                    {movieData && (
                        <MovieInfo
                            banner={movieData.banner}
                            movieName={movieData.movieName}
                            selectedTheater={movieData.selectedTheater}
                            cinemaRoom={movieData.cinemaRoom}
                            currentSelectedTime={movieData.currentSelectedTime}
                            selectedSeats={new Set(movieData.selectedSeats)}
                            seats={movieData.seats}
                            currentTicketPrice={movieData.currentTicketPrice}
                            foods={foods}
                            quantities={quantities}
                            backToHome={backToHome}
                            handleContinue={handleContinue}
                        />
                    )}
                </div>
            </div>
            <UserFooter />
        </>
    );
};

export default Payment;

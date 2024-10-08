import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LOCALHOST, REQUEST_MAPPING } from '../../../../../../APIs/typing';

const PaymentReturn: React.FC = () => {
    const [message, setMessage] = useState('');
    const [orderInfo, setOrderInfo] = useState('');
    const [paymentTime, setPaymentTime] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [responseCode, setResponseCode] = useState('');
    const [transactionStatus, setTransactionStatus] = useState('');

    const extractParamsFromUrl = () => {
        const urlParams = new URLSearchParams(window.location.search);
        return {
            vnpOrderInfo: urlParams.get('vnp_OrderInfo') || '',
            vnpPaymentTime: urlParams.get('vnp_PayDate') || '',
            vnpTransactionId: urlParams.get('vnp_TransactionNo') || '',
            vnpTotalPrice: urlParams.get('vnp_Amount') || '',
            vnpResponseCode: urlParams.get('vnp_ResponseCode') || '',
            vnpTransactionStatus: urlParams.get('vnp_TransactionStatus') || '',
        };
    };

    const updateStateWithParams = (params: any) => {
        setOrderInfo(params.vnpOrderInfo);
        setPaymentTime(params.vnpPaymentTime);
        setTransactionId(params.vnpTransactionId);
        setTotalPrice(params.vnpTotalPrice);
        setResponseCode(params.vnpResponseCode);
        setTransactionStatus(params.vnpTransactionStatus);
    };

    const handlePaymentStatus = (transactionStatus: string, params: any) => {
        if (transactionStatus === '00') {
            setMessage('Thanh toán thành công!');
            axios.post('http://localhost:8080/vnpay-payment-return', {
                orderInfo: params.vnpOrderInfo,
                paymentTime: params.vnpPaymentTime,
                transactionId: params.vnpTransactionId,
                totalPrice: params.vnpTotalPrice,
                responseCode: params.vnpResponseCode,
                transactionStatus: params.vnpTransactionStatus,
            })
                .then(response => {
                    console.log('Xử lý thanh toán thành công:', response.data);

                })
                .catch(error => {
                    console.error('Lỗi khi xử lý thanh toán:', error);
                });
        } else {
            setMessage('Thanh toán không thành công. Vui lòng thử lại.');
        }
    };

    const updateFoodQuantities = async () => {
        try {
            const selectedFoods = sessionStorage.getItem('selectedFoods');
            const selectedQuantities = sessionStorage.getItem('selectedQuantities');

            if (!selectedFoods || !selectedQuantities) {
                console.error('Không có dữ liệu đồ ăn trong sessionStorage.');
                return;
            }

            const foods = JSON.parse(selectedFoods);
            const quantities = JSON.parse(selectedQuantities);

            const foodUpdatePromises = foods.map((food: any, index: number) => {
                const newQuantity = Math.max(0, food.quantity - quantities[index]); // Ensure quantity does not go below zero
                return axios.put(`${LOCALHOST}${REQUEST_MAPPING.FOOD}/update-quantity-food/${food.id}`, {
                    quantity: newQuantity,
                });
            });

            await Promise.all(foodUpdatePromises);
            console.log('Cập nhật số lượng đồ ăn thành công!');
        } catch (error) {
            console.error('Lỗi khi cập nhật số lượng đồ ăn:', error);
        }
    };


    const updateStatusSeat = async () => {
        try {
            const storedData = sessionStorage.getItem('movieBookingData');
            if (!storedData) {
                console.error('Không có dữ liệu đặt vé trong sessionStorage.');
                return;
            }

            const movieData = JSON.parse(storedData);

            if (!movieData.cinemaRoom || !Array.isArray(movieData.selectedSeats)) {
                console.error('Dữ liệu không hợp lệ hoặc thiếu.');
                return;
            }

            const seatUpdatePromises = movieData.selectedSeats.map((seatId: string) => {
                return axios.put(`${LOCALHOST}${REQUEST_MAPPING.SEAT}/update-status`, null, {
                    params: {
                        cinemaRoomId: movieData.cinemaRoom.id,
                        seatId: seatId,
                        status: 'booked',
                    },
                });
            });

            await Promise.all(seatUpdatePromises);

            console.log('Cập nhật trạng thái ghế thành công!');
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái ghế:', error);
        }
    };


    useEffect(() => {
        const params = extractParamsFromUrl();
        updateStateWithParams(params);
        handlePaymentStatus(params.vnpTransactionStatus, params);
        updateStatusSeat();
        updateFoodQuantities();
        sessionStorage.removeItem('bookingExpireTime');
        sessionStorage.removeItem('selectedFoods');
        sessionStorage.removeItem('movieBookingData');
        sessionStorage.removeItem('selectedDate');
        sessionStorage.removeItem('selectedQuantities');

        localStorage.removeItem('user');
        localStorage.removeItem('endTime');
        localStorage.removeItem('timeLeft');
    }, []);

    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            maxWidth: '800px',
            margin: '50px auto',
            padding: '20px',
            backgroundColor: '#ffffff',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            textAlign: 'center',
            fontFamily: 'Noto Sans JP, sans-serif'
        },
        successMessage: {
            color: '#4CAF50',
            marginBottom: '20px',
        },
        details: {
            marginTop: '20px',
            textAlign: 'left',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '600px',
        },
        button: {
            display: 'inline-block',
            padding: '10px 20px',
            marginTop: '20px',
            backgroundColor: '#4CAF50',
            color: '#ffffff',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '16px',
        },
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(amount / 100);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.successMessage}>{message}</h1>
            <div style={styles.details}>
                <p><strong>Thông tin đơn hàng:</strong> {orderInfo}</p>
                <p><strong>Thời gian thanh toán:</strong> {paymentTime}</p>
                <p><strong>Mã giao dịch:</strong> {transactionId}</p>
                <p><strong>Tổng số tiền:</strong> {formatCurrency(totalPrice)} VND</p>
                <p><strong>Mã phản hồi:</strong> {responseCode}</p>
                <p><strong>Trạng thái giao dịch:</strong> {transactionStatus == "00" ? "Success" : ""}</p>
            </div>
            <a href="/user" style={styles.button}>Quay lại trang chủ</a>
        </div>
    );
};

export default PaymentReturn;
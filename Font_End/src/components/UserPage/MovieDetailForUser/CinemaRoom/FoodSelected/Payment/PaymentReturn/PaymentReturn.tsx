import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API, LOCALHOST, REQUEST_MAPPING } from '../../../../../../APIs/typing';
import dayjs from 'dayjs';

const PaymentReturn: React.FC = () => {
    const [message, setMessage] = useState('');
    const [orderInfo, setOrderInfo] = useState('');
    const [paymentTime, setPaymentTime] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
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
        } else {
            setMessage('Thanh toán không thành công. Vui lòng thử lại.');
        }
    };

    const updateStatusSeat = async () => {
        try {
            // Lấy dữ liệu từ sessionStorage
            const storedData = sessionStorage.getItem('movieBookingData');
            const dateData = sessionStorage.getItem('selectedDate');
            if (!storedData) {
                console.error('Không có dữ liệu đặt vé trong sessionStorage.');
                return;
            }

            if (!dateData) {
                console.error('Không có dữ liệu date trong sessionStorage.');
                return;
            }

            const movieData = JSON.parse(storedData);
            const dateeData = JSON.parse(dateData);

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

            console.log("Ghế đã được đặt thành công vào giờ:", movieData.showTime, "ngày:", dateeData.date);

            // Tính thời gian bắt đầu và kết thúc phim
            const startTime = dayjs(`${dateeData.date} ${movieData.showTime}`, 'DD/MM HH:mm');
            const endTime = dayjs(`${dateeData.date} ${movieData.showTimeEnd}`, 'DD/MM HH:mm');

            // Tính thời gian chờ trước khi cập nhật trạng thái ghế thành "available"
            const delay = endTime.diff(startTime);

            console.log("Thời gian chờ trước khi cập nhật trạng thái ghế là (milliseconds):", delay);

            setTimeout(async () => {
                const seatUpdateAvailablePromises = movieData.selectedSeats.map((seatId: string) => {
                    return axios.put(`${LOCALHOST}${REQUEST_MAPPING.SEAT}/update-status`, null, {
                        params: {
                            cinemaRoomId: movieData.cinemaRoom.id,
                            seatId: seatId,
                            status: 'available',
                        },
                    });
                });

                await Promise.all(seatUpdateAvailablePromises);

                console.log("Ghế đã được cập nhật trạng thái thành available vào giờ:", movieData.showTimeEnd, "ngày:", dateeData.date);
            }, delay);

        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái ghế:', error);
        }
    };


    useEffect(() => {
        const params = extractParamsFromUrl();
        updateStateWithParams(params);
        handlePaymentStatus(params.vnpTransactionStatus, params);
        updateStatusSeat()
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

    return (
        <div style={styles.container}>
            <h1 style={styles.successMessage}>{message}</h1>
            <div style={styles.details}>
                <p><strong>Thông tin đơn hàng:</strong> {orderInfo}</p>
                <p><strong>Thời gian thanh toán:</strong> {paymentTime}</p>
                <p><strong>Mã giao dịch:</strong> {transactionId}</p>
                <p><strong>Tổng số tiền:</strong> {totalPrice} VNĐ</p>
                <p><strong>Mã phản hồi:</strong> {responseCode}</p>
                <p><strong>Trạng thái giao dịch:</strong> {transactionStatus}</p>
            </div>
            <a href="/user" style={styles.button}>Quay lại trang chủ</a>
        </div>
    );
};

export default PaymentReturn;

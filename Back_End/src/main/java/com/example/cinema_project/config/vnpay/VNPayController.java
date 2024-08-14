package com.example.cinema_project.config.vnpay;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class VNPayController {

    @Autowired
    private VNPayService vnPayService;

    @PostMapping("/submitOrder")
    public ResponseEntity<String> submitOrder(@RequestParam("amount") int orderTotal,
                                              @RequestParam("orderInfo") String orderInfo,
                                              HttpServletRequest request) {
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + "5173";
        String vnpayUrl = vnPayService.createOrder(request, orderTotal, orderInfo, baseUrl);
        return ResponseEntity.ok(vnpayUrl);
    }

    @PostMapping("/vnpay-payment-return")
    public ResponseEntity<Map<String, String>> paymentCompleted(HttpServletRequest request) {
        Map<String, String> response = new HashMap<>();

        String orderInfo = request.getParameter("vnp_OrderInfo");
        String paymentTime = request.getParameter("vnp_PayDate");
        String transactionId = request.getParameter("vnp_TransactionNo");
        String totalPrice = request.getParameter("vnp_Amount");
        String responseCode = request.getParameter("vnp_ResponseCode");
        String transactionStatus = request.getParameter("vnp_TransactionStatus");

        response.put("orderInfo", orderInfo);
        response.put("paymentTime", paymentTime);
        response.put("transactionId", transactionId);
        response.put("totalPrice", totalPrice);
        response.put("responseCode", responseCode);
        response.put("transactionStatus", transactionStatus);

        if ("00".equals(transactionStatus)) {
            // Nếu thanh toán thành công, trả về trang thành công
            response.put("status", "success");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            // Nếu thanh toán thất bại, trả về trang thất bại
            response.put("status", "failure");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}

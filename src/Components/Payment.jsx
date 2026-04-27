import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function Payment() {
    const location = useLocation();
    const navigate = useNavigate();

    const { order } = location.state || {};
    const [loading, setLoading] = useState(false);

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        setLoading(true);

        const res = await loadRazorpay();

        if (!res || !window.Razorpay) {
            alert("Razorpay SDK failed to load");
            setLoading(false);
            return;
        }

        const options = {
            key: "rzp_test_4yosHYDduPYmKN",
            amount: order.total * 100,
            currency: "INR",
            name: "My Shop",
            description: "Order Payment",

            handler: function (response) {
                setLoading(false);

                navigate("/order-success", {
                    state: {
                        order: {
                            ...order,
                            paymentMethod: "upi",
                            paymentStatus: "paid",
                            paymentId: response.razorpay_payment_id
                        }
                    }
                });
            },

            prefill: {
                name: order.name,
                email: order.email || "test@gmail.com",
                contact: order.mobile
            },

            theme: {
                color: "#3399cc"
            }
        };

        const paymentObject = new window.Razorpay(options);

        paymentObject.on("payment.failed", function () {
            setLoading(false);
            alert("Payment Failed!");
            navigate("/payment-failed");
        });

        paymentObject.open();
    };

    if (!order) {
        return (
            <div className="container mt-5 text-center mb-3">
                <h3>No order found</h3>
                <button className="btn btn-primary" onClick={() => navigate("/")}>
                    Go to Home
                </button>
            </div>
        );
    }

    return (
        <div className="container text-center mt-5 mb-3">
            <h2>Complete Your Payment</h2>

            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Mobile:</strong> {order.mobile}</p>
            <p><strong>Total Amount:</strong> ₹{order.total}</p>

            <button
                className="btn btn-primary mt-3"
                onClick={handlePayment}
                disabled={loading}
            >
                {loading ? "Processing..." : "Pay with UPI"}
            </button>
        </div>
    );
}

export default Payment;
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function OrderSuccess() {
    const location = useLocation();
    const navigate = useNavigate();

    const { order } = location.state || {};

    if (!order) {
        return (
            <div className="container mt-5 text-center">
                <h3>No order found</h3>
                <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
                    Go to Home
                </button>
            </div>
        );
    }

    const isCOD = order.paymentMethod === "cod";
    const isUPI = order.paymentMethod === "upi";

    return (
        <div className="container mt-5">

            {/* Success Header */}
            <div className="text-center">
                <i
                    className="bi bi-check-circle text-success"
                    style={{ fontSize: "70px" }}
                ></i>

                <h2 className="mt-3">Order Placed Successfully 🎉</h2>

                {isUPI && order.paymentStatus === "paid" && (
                    <p className="text-success">Payment Completed Successfully</p>
                )}

                {isCOD && (
                    <p className="text-warning">Pay on Delivery</p>
                )}
            </div>

            {/* Order Details Card */}
            <div className="card mt-4 p-4">

                <h4>Order Summary</h4>
                <hr />

                <p><strong>Customer Name:</strong> {order.name}</p>
                <p><strong>Mobile:</strong> {order.mobile}</p>
                <p><strong>Address:</strong> {order.address}, {order.city}, {order.state} - {order.postalCode}</p>

                <hr />

                <p><strong>Payment Method:</strong> {order.paymentMethod.toUpperCase()}</p>

                {/* Payment Section */}
                {/* Payment Amount Section */}
                <div className="card mt-3 p-4 text-end">
                    <h5>
                        {order.paymentStatus === "paid" ? (
                            <>
                                Total Paid: ₹{Number(order?.total || 0).toLocaleString()}
                            </>
                        ) : (
                            <>
                                Amount to be Paid: ₹{Number(order?.total || 0).toLocaleString()}
                            </>
                        )}
                    </h5>
                </div>

                {/* Razorpay Payment ID (only UPI) */}
                {order.paymentId && (
                    <p>
                        <strong>Payment ID:</strong> {order.paymentId}
                    </p>
                )}

            </div>

            {/* Items Section */}
            {order.items && order.items.length > 0 && (
                <div className="card mt-3 p-4">

                    <h4>Products</h4>
                    <hr />

                    {order.items.map((item, index) => (
                        <div
                            key={index}
                            className="d-flex justify-content-between border-bottom py-2"
                        >
                            <span>{item.name}</span>
                            <span>Qty: {item.quantity}</span>
                        </div>
                    ))}

                </div>
            )}


            {/* Buttons */}
            <div className="text-center mt-4 mb-3">
                <button
                    className="btn btn-primary me-2"
                    onClick={() => navigate("/products")}
                >
                    Continue Shopping
                </button>

            </div>

        </div>
    );
}

export default OrderSuccess;
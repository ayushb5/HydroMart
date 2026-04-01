import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { decrementQuantity, incrementQuantity, removeFromCart } from "../State/cartSlice";

function CartPage() {
    const navigate = useNavigate();

    const cartProducts = useSelector((state) => state.cart.cartProducts);
    const dispatch = useDispatch();

    let subtotal = cartProducts.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
    let shipping = 50;
    let tax = subtotal * 0.18;
    let total = subtotal + shipping + tax;

    return (
        <>
            <div className="container py-5">
                <h1 className="mb-5">Your Shopping Cart</h1>
                <div className="row">
                    <div className="col-lg-8">
                        <div className="card mb-4">
                            <div className="card-body">
                                {cartProducts.length === 0 ? (
                                    <h5 className="text-center">Cart is Empty</h5>
                                ) : (
                                    cartProducts.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <div className="row cart-item mb-3 align-items-center">
                                                    <div className="col-md-3">
                                                        <img src={item.productImgUrl} alt="productImg" className="img-fluid rounded" />
                                                    </div>
                                                    <div className="col-md-5">
                                                        <h5 className="card-title">{item.productName}</h5>
                                                        <p className="text-muted">{item.technology}</p>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <div className="input-group">
                                                            <button className="btn btn-sm btn-outline-primary" type="button" onClick={() => dispatch(decrementQuantity(item.id))} disabled={item.quantity === 1}>-</button>
                                                            <input type="text" className="form-control form-control-sm text-center" value={item.quantity || 1} style={{ maxWidth: "60px", width: "30px" }} />
                                                            <button className="btn btn-sm btn-outline-primary" type="button" onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2 text-end">
                                                        <p className="fw-bold">₹{Number(item.price).toLocaleString("en-IN")}</p>
                                                        <button className="btn btn-sm btn-outline-danger" onClick={() => dispatch(removeFromCart(item.id))}>
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </div>
                                                    <hr />
                                                </div>
                                            </div>
                                        )
                                    })
                                )}
                                <div class="text-start mb-4">
                                    <button class="btn btn-outline-primary" onClick={() => navigate("/products")}>
                                        <i class="bi bi-arrow-left me-2"></i>Continue Shopping
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card cart-summary">
                            <div className="card-body">
                                <h5 className="card-title mb-4">Order Summary</h5>
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Shipping</span>
                                    <span>₹{shipping}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span>GST (18%)</span>
                                    <span>₹{(tax).toLocaleString()}</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between mb-4">
                                    <strong>Total</strong>
                                    <strong>₹{total.toLocaleString()}</strong>
                                </div>
                                <button className="btn btn-primary w-100" disabled={total == shipping} onClick={() => navigate("/checkout", {
                                    state: {
                                        subtotal,
                                        shipping,
                                        tax,
                                        total
                                    }
                                })}>Proceed to Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPage
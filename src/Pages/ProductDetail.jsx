import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function ProductDetail() {

    const { id } = useParams();
    const [item, setItem] = useState({});

    function loadData() {
        axios.get(import.meta.env.VITE_BASE_URL + `/products/${id}`)
            .then((res) => {
                setItem(res.data);
            });
    }

    useEffect(() => {
        loadData();
    }, [id]);

    return (
        <div className="container mt-5">
            <div className="row my-4">

                <div className="col-md-5 text-center">
                    <img
                        src={item.productImgUrl}
                        className="img-fluid rounded shadow"
                        style={{ maxHeight: "400px" }}
                    />
                </div>

                <div className="col-md-7">

                    <h3 className="fw-bold">{item.productName}</h3>
                    <p className="text-muted">{item.brandName}</p>

                    <div className="d-flex align-items-center gap-3 mb-3">
                        <h3 className="text-primary m-0">
                            ₹{Number(item.price).toLocaleString()}
                        </h3>

                        <del className="text-danger">
                            ₹{(Number(item.price) + Number(item.discount)).toLocaleString()}
                        </del>

                        <span className="badge bg-success">
                            {Math.round((item.discount / item.price) * 100)}% OFF
                        </span>
                    </div>

                    <div className="mb-3">
                        <span className="badge bg-light text-dark border me-2">
                            {item.technology}
                        </span>

                        <span className="badge bg-light text-dark border">
                            {item.capacity} L Capacity
                        </span>
                    </div>

                    <p className="text-muted">
                        {item.description}
                    </p>

                    <p>
                        <strong>Warranty:</strong> {item.warranty}
                    </p>

                    <div className="d-flex gap-3 mt-4">
                        <button className="btn btn-warning">
                            Add to Cart
                        </button>

                        <button className="btn btn-outline-primary">
                            Buy Now
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default ProductDetail;
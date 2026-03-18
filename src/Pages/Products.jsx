import axios from "axios"
import { useState, useEffect } from "react";

function Products() {
    const filters = {
        brand: ["Kent", "Aquaguard", "Livpure", "Pureit", "AO Smith", "Blue Star", "Havells", "LG"],
        technology: ["RO (Reverse Osmosis)", "UV (Ultraviolet)", "UF (Ultrafiltration)", "RO + UV", "RO + UV + UF", "RO + UV + UF + TDS", "RO + Alkaline", "RO + Copper", "Gravity (UF)"],
        price: ["₹0 – ₹5,000", "₹5,000 – ₹10,000", "₹10,000 – ₹15,000", "₹15,000+"],
        Capacity: ["7L", "8L", "9L", "10L"],
        Warranty: ["6 Months", "1 Year", "2 Years", "3 Years"],
        Rating: ["2.0 and above", "3.0 and above", "3.5 and above", "4.0 and above", "4.5 and above",]
    }
    const [loading, setLoading] = useState(true);

    const [productData, setProductData] = useState([])

    function getData() {
        setLoading(true);
        axios.get("https://69ae5d0fc8b37f4998353805.mockapi.io/products")
            .then(res => { setProductData(res.data); setLoading(false); })
            .catch(err => { console.log(err); setLoading(false); });
    }

    useEffect(() => {
        getData();
    }, [])
    return (
        <>
            <div className="container">
                <div className="productsNav my-3 row">
                    <div className="col-lg-9 d-flex justify-content-center">
                        <form className="w-75">
                            <input type="text" placeholder="Search" className="p-2 w-100" />
                        </form>
                    </div>
                    <div className="col-lg-3 gap-2 d-flex align-items-center justify-content-center">
                        <h5 className="mb-0">Sort By</h5>
                        <select id="sortBy" className="form-select w-auto">
                            <option value="">Featured</option>
                            <option value="Price(Low to High)">Price(Low to High)</option>
                            <option value="Price(High to Low)">Price(High to Low)</option>
                            <option value="New Arrival">New Arrival</option>
                            <option value="Ratings">Ratings</option>
                        </select>
                    </div>
                </div>

                <div className="row g-5">
                    <div className="col-lg-3 border mb-3 p-2 px-4 rounded">
                        <h4 className="mb-0">FILTERS</h4>
                        <p className="text-muted mt-0">{productData.length}</p>

                        <hr />

                        {Object.entries(filters).map(([key, values], i) => {
                            return (
                                <div key={i}>
                                    <div className="filter">
                                        <div data-bs-toggle="collapse" data-bs-target={`#${key}`} className="filter-toggle d-flex justify-content-between align-items-center cursor-pointer collapsed">
                                            <h4 className="text-capitalize">{key}</h4>
                                            <i className="bi bi-chevron-down"></i>
                                        </div>

                                        <div id={key} className="collapse mt-3 px-2">
                                            {values.map((value, j) => {
                                                return (
                                                    <div className="form-check mb-2" key={j}>
                                                        <input type="checkbox" id={value} value={value} className="form-check-input cursor-pointer me-2" />
                                                        <label htmlFor={value} className="cursor-pointer user-select-none fs-6">{value}</label>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            )
                        })}

                        <button className="btn btn-primary mt-4 mx-auto w-50 d-block">Clear All</button>
                    </div>
                    <div className="col-lg-9">
                        {loading ? (
                            <div className="d-flex justify-content-center align-items-center" style={{ height: "400px" }}>
                                <div className="spinner-border text-primary" role="status"></div>
                            </div>
                        ) : (
                            <div className="row g-4">
                                {productData.map((product, i) => {
                                    return (
                                        <div className="col-lg-3" key={i}>
                                            <div className="card h-100 productCard">
                                                <div className="card-body">
                                                    <img src={product.productImgUrl} className="img-fluid" alt="" />
                                                    <p className="mt-2 mb-0 fw-bold">{product.brandName}</p>
                                                    <p className="m-0 mb-2 product-title">{product.productName}</p>
                                                    <div className="d-flex align-items-center gap-4">
                                                        <span className="pill bg-light rounded p-1 fw-semibold" style={{ fontSize: "12px" }}>{product.technology}</span>
                                                        <span className="fw-semibold" style={{ fontSize: "14px" }}>{product.capacity}</span>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-3 mt-2">
                                                        <h4 className="m-0">₹{Number(product.price).toLocaleString()}</h4>
                                                        <del className="fs-5">₹{(Number(product.price) + Number(product.discount)).toLocaleString()}</del>
                                                    </div>

                                                    <div className="d-flex gap-3 mt-3">
                                                        <button className="btn btn-sm btn-outline-light text-dark border-dark product-btn"><i class="bi bi-cart fs-6"></i> Add to Cart</button>
                                                        <button className="btn btn-sm btn-primary product-btn"><i className="bi bi-bag-check "></i> Buy Now</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}



                        <ul class="pagination mt-3 justify-content-center">
                            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products
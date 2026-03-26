import axios from "axios"
import { useState, useEffect } from "react";

function Products() {
    const filters = {
        brand: ["Kent", "Aquaguard", "Livpure", "Pureit", "AO Smith", "Blue Star", "Havells", "LG"],
        technology: ["RO (Reverse Osmosis)", "UV (Ultraviolet)", "UF (Ultrafiltration)", "RO + UV", "RO + UV + UF", "RO + UV + UF + TDS", "RO + Alkaline", "RO + Copper", "Gravity (UF)"],
        price: ["₹0 - ₹5,000", "₹5,000 - ₹10,000", "₹10,000 - ₹15,000", "₹15,000+"],
        "Capacity(ltr)": ["7", "8", "9", "10"],
        Warranty: ["6 Months", "1 Year", "2 Years", "3 Years"],
        Rating: ["2.0 and above", "3.0 and above", "3.5 and above", "4.0 and above", "4.5 and above",]
    }
    const [loading, setLoading] = useState(true);
    const [productData, setProductData] = useState([])

    const [search, setSearch] = useState("");
    const [selectedFilters, setSelectedFilters] = useState({});
    const [sortBy, setSortBy] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(12);

    function getData() {
        setLoading(true);
        axios.get(import.meta.env.VITE_BASE_URL + "/products")
            .then(res => { setProductData(res.data); setLoading(false); })
            .catch(err => { console.log(err); setLoading(false); });
    };

    function handleFilterChange(category, value, checked) {
        setSelectedFilters((prev) => {
            const updated = { ...prev };
            if (!updated[category]) {
                updated[category] = [];
            }
            if (checked) {
                updated[category].push(value);
            } else {
                updated[category] = updated[category].filter((v) => v !== value);
            }
            return updated;
        })
    }
    const keyMap = {
        brand: "brandName",
        technology: "technology",
        price: "price",
        "Capacity(ltr)": "capacity",
        Warranty: "warranty",
        Rating: "rating"
    };

    const filteredProducts = productData.filter((product) => {
        const matchesSearch =
            product.productName.toLowerCase().includes(search.toLowerCase()) ||
            product.brandName.toLowerCase().includes(search.toLowerCase());

        const matchesFilters = Object.entries(selectedFilters).every(
            ([category, values]) => {
                if (values.length === 0) return true;

                const productValue = product[keyMap[category]];

                if (category === "price") {
                    return values.some((range) => {
                        const price = Number(product.price);

                        if (range === "₹0 - ₹5,000") return price <= 5000;
                        if (range === "₹5,000 - ₹10,000") return price > 5000 && price <= 10000;
                        if (range === "₹10,000 - ₹15,000") return price > 10000 && price <= 15000;
                        if (range === "₹15,000+") return price > 15000;

                        return true;
                    });
                }

                if (category === "Rating") {
                    return values.some((val) => {
                        const minRating = parseFloat(val);
                        return product.rating >= minRating;
                    });
                }
                if (category === "Capacity(ltr)") {
                    return values.some((val) => product.capacity === val);
                }
                return values.some((val) =>
                    productValue?.toString().toLowerCase().trim() === val.toLowerCase().trim());
            }
        );
        return matchesSearch && matchesFilters;
    }).sort((a, b) => {
        if (sortBy === "Price(Low to High)") return a.price - b.price;
        if (sortBy === "Price(High to Low)") return b.price - a.price;
        if (sortBy === "Ratings") return b.rating - a.rating;
        return 0;
    })

    // Pagination
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = filteredProducts.slice(firstPostIndex, lastPostIndex);
    const totalPages = Math.ceil(filteredProducts.length / postsPerPage);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    useEffect(() => {
        getData();
        setCurrentPage(1);
    }, [search, selectedFilters, sortBy]);

    return (
        <>
            <div className="container">
                <div className="productsNav my-3 row">
                    <div className="col-lg-9 d-flex justify-content-center">
                        <form className="w-75">
                            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="p-2 w-100" />
                        </form>
                    </div>
                    <div className="col-lg-3 gap-2 d-flex align-items-center justify-content-center">
                        <h5 className="mb-0">Sort By</h5>
                        <select id="sortBy" className="form-select w-auto" onChange={(e) => setSortBy(e.target.value)}>
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
                        <p className="text-muted mt-0">Products Count: {filteredProducts.length}</p>

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
                                                        <input type="checkbox" id={value} value={value} checked={selectedFilters[key]?.includes(value) || false} onChange={(e) => handleFilterChange(key, value, e.target.checked)} className="form-check-input cursor-pointer me-2" />
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

                        <button className="btn btn-primary mt-4 mx-auto w-50 d-block" onClick={() => {
                            setSelectedFilters({});
                            setSearch("");
                            setSortBy("");
                        }}>Clear All</button>
                    </div>
                    <div className="col-lg-9">
                        {loading ? (
                            <div className="d-flex justify-content-center align-items-center" style={{ height: "400px" }}>
                                <div className="spinner-border text-primary" role="status"></div>
                            </div>
                        ) : (
                            <div className="row g-4">
                                {currentPosts.map((product, i) => {
                                    return (
                                        <div className="col-lg-3" key={i}>
                                            <div className="card h-100 productCard">
                                                <div className="card-body">
                                                    <img src={product.productImgUrl} className="img-fluid" alt="" />
                                                    <p className="mt-2 mb-0 fw-bold">{product.brandName}</p>
                                                    <p className="m-0 mb-2 product-title">{product.productName}</p>
                                                    <div className="d-flex align-items-center gap-4">
                                                        <span className="pill bg-light rounded p-1 fw-semibold text-truncate" style={{ fontSize: "12px", maxWidth: "70%" }}>{product.technology}</span>
                                                        <span className="fw-semibold" style={{ fontSize: "14px" }}>{product.capacity} L</span>
                                                    </div>
                                                    <div className="d-flex align-items-center gap-3 mt-2">
                                                        <h4 className="m-0">₹{Number(product.price).toLocaleString()}</h4>
                                                        <del className="fs-5">₹{(Number(product.price) + Number(product.discount)).toLocaleString()}</del>
                                                    </div>

                                                    <div className="d-flex justify-content-center mt-3">
                                                        <button className="btn btn-sm btn-outline-warning text-dark border-dark product-btn"><i class="bi bi-cart fs-6"></i> Add to Cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}



                        <ul className="pagination mt-3 justify-content-center">

                            {/* Previous */}
                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                >
                                    Previous
                                </button>
                            </li>

                            {/* Page Numbers */}
                            {pages.map((page, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${currentPage === page ? "active" : ""}`}
                                >
                                    {page === "..." ? (
                                        <span className="page-link">...</span>
                                    ) : (
                                        <button
                                            className="page-link"
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </button>
                                    )}
                                </li>
                            ))}

                            {/* Next */}
                            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                >
                                    Next
                                </button>
                            </li>

                        </ul>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Products
import { NavLink } from "react-router-dom"
function Home() {
    return (
        <>
            <div className="container">
                <div className="carousel slide carousel-fade"
                    data-bs-ride="carousel"
                    data-bs-interval="3000"
                    id="withindicators"
                >
                    <div className="carousel-indicators">
                        <button
                            className="active"
                            data-bs-slide-to="0"
                            data-bs-target="#withindicators">
                        </button>

                        <button data-bs-slide-to="1" data-bs-target="#withindicators"></button>
                        <button data-bs-slide-to="2" data-bs-target="#withindicators"></button>
                    </div>

                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="/banner1.png" className="d-block w-100" />
                        </div>
                        <div className="carousel-item">
                            <img src="/banner2.png" className="d-block w-100" />
                            <div className="carousel-caption placeButton d-none d-sm-block">
                                <NavLink to={"/products"} className="btn btn-primary">
                                    Browse products
                                </NavLink>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="/banner3.png" className="d-block w-100" />
                            <div className="carousel-caption placeButton d-none d-sm-block">
                                <NavLink to={"/compare"} className="btn btn-primary">
                                    Compare Now
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <button className="carousel-control-prev"
                        data-bs-slide="prev"
                        data-bs-target="#withindicators"
                    >
                        <span className="carousel-control-prev-icon"></span>
                    </button>
                    <button className="carousel-control-next"
                        data-bs-slide="next"
                        data-bs-target="#withindicators"
                    >
                        <span className="carousel-control-next-icon"></span>
                    </button>
                </div>

                <div className="row my-3 purifierCategory">
                    <h2 className="text-center fw-bold my-4" style={{ color: "darkblue" }}>Shop by Category</h2>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="card text-center shadow-sm rounded overflow-hidden">
                            <img src="/RO_purifier.png" className="img-fluid mx-auto my-2" alt="" />
                            <div className="card-body d-flex align-items-center flex-column">
                                <h5 className="card-title text-light my-3">RO Purifiers</h5>
                                <NavLink to={"/products"} className={"btn btn-warning"}>Explore</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="card text-center shadow-sm rounded overflow-hidden">
                            <img src="/UV_purifier.png" className="img-fluid mx-auto my-2" alt="" />
                            <div className="card-body d-flex align-items-center flex-column">
                                <h5 className="card-title text-light my-3">UV Purifiers</h5>
                                <NavLink to={"/products"} className={"btn btn-warning"}>Explore</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="card text-center shadow-sm rounded overflow-hidden">
                            <img src="/UF_purifier.png" className="img-fluid mx-auto my-2" alt="" />
                            <div className="card-body d-flex align-items-center flex-column">
                                <h5 className="card-title text-light my-3">UF Purifiers</h5>
                                <NavLink to={"/products"} className={"btn btn-warning"}>Explore</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="card text-center shadow-sm overflow-hidden">
                            <img src="/Alkaline_purifier.png" className="img-fluid mx-auto my-2" alt="" />
                            <div className="card-body d-flex align-items-center flex-column">
                                <h5 className="card-title text-light my-3">Alkaline Purifiers</h5>
                                <NavLink to={"/products"} className={"btn btn-warning"}>Explore</NavLink>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className="text-center fw-bold my-4 mt-5" style={{ color: "darkblue" }}>Why Choose Us</h2>
                <div className="row shadow-sm rounded p-3" style={{ backgroundColor: "rgb(241, 249, 255)" }}>
                    <div className="col-lg-3 d-flex align-items-center justify-content-center gap-2 feature-border">
                        <i className="bi bi-funnel-fill fs-2"></i>
                        <h5 className="mb-0">Advanced Filtration</h5>
                    </div>
                    <div className="col-lg-3 d-flex align-items-center justify-content-center gap-2 feature-border">
                        <i className="bi bi-tools fs-2"></i>
                        <h5 className="mb-0">Free Installation</h5>
                    </div>
                    <div className="col-lg-3 d-flex align-items-center justify-content-center gap-2 feature-border">
                        <i className="bi bi-shield-fill-check fs-2"></i>
                        <h5 className="mb-0">1 Year Warranty</h5>
                    </div>
                    <div className="col-lg-3 d-flex align-items-center justify-content-center gap-2">
                        <i className="bi bi-truck fs-2"></i>
                        <h5 className="mb-0">Fast Delivery</h5>
                    </div>
                </div>

                <h2 className="text-center fw-bold my-3 mt-5 mb-0" style={{ color: "darkblue" }}>Featured Brands</h2>
                <div className="brand-carousel">
                    <div aria-hidden className="group">
                        <div className="card">
                            <img src="https://www.kent.co.in/images/logo/kent-logo.svg" alt="" />
                        </div>
                        <div className="card">
                            <img src="/brand_logos/aquaguard.jpeg" className="img-fluid" alt="" />
                        </div>
                        <div className="card">
                            <img src="/brand_logos/Livpure.jpeg" className="img-fluid" alt="" />
                        </div>
                        <div className="card">
                            <img src="/brand_logos/Pureit.png" className="img-fluid" alt="" />
                        </div>
                        <div className="card">
                            <img src="/brand_logos/AOSmith.png" className="img-fluid" alt="" />
                        </div>
                        <div className="card">
                            <img src="https://havells.com/media/logo/stores/1/Havells_Logo.svg" className="img-fluid" alt="" />
                        </div>
                        <div className="card">
                            <img src="https://www.lg.com/content/dam/lge/common/logo/logo-lg-100-44.svg" className="img-fluid" alt="" />
                        </div>
                        <div className="card">
                            <img src="/brand_logos/Panasonic.png" className="img-fluid" alt="" />
                        </div>
                    </div>
                    <div aria-hidden className="group">
                        <div className="card">
                            <img src="https://www.kent.co.in/images/logo/kent-logo.svg" alt="" />
                        </div>
                        <div className="card">
                            <img src="/brand_logos/aquaguard.jpeg" className="img-fluid" alt="" />
                        </div>
                        <div className="card">
                            <img src="/brand_logos/Livpure.jpeg" className="img-fluid" alt="" />
                        </div>
                        <div className="card">
                            <img src="/brand_logos/Pureit.png" className="img-fluid" alt="" />
                        </div>
                        <div className="card">
                            <img src="/brand_logos/AOSmith.png" className="img-fluid" alt="" />
                        </div>
                        <div className="card">
                            <img src="https://havells.com/media/logo/stores/1/Havells_Logo.svg" className="img-fluid" alt="" />
                        </div>
                        <div className="card">
                            <img src="https://www.lg.com/content/dam/lge/common/logo/logo-lg-100-44.svg" className="img-fluid" alt="" />
                        </div>
                        <div className="card">
                            <img src="/brand_logos/Panasonic.png" className="img-fluid" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
import { NavLink } from "react-router-dom"
import HydroMart from "/HydroMart.png"

function Footer() {
    return (
        <>
            <footer className="text-white text-center" style={{ backgroundColor: "rgba(18, 49, 141, 0.9)" }}>
                <div className="container">
                    <section className="pt-3">
                        <div className="row text-center d-flex justify-content-center pt-4">
                            <NavLink to="/" className={"mb-5"}>
                                <div className="bg-light d-inline-block px-3 py-1 rounded">
                                    <img src={HydroMart} className="img-fluid" alt="HydroMart" style={{ height: "45px", width: "auto" }} />
                                </div>
                            </NavLink >
                            <div className="col-md-2">
                                <h6 className="text-uppercase fw-bold">
                                    <NavLink to={"/"} className="text-white text-decoration-none">Home</NavLink>
                                </h6>
                            </div>
                            <div className="col-md-2">
                                <h6 className="text-uppercase fw-bold">
                                    <NavLink to={"/products"} className="text-white text-decoration-none">Products</NavLink>
                                </h6>
                            </div>
                            <div className="col-md-2">
                                <h6 className="text-uppercase fw-bold">
                                    <NavLink to={"/gallery"} className="text-white text-decoration-none">Gallery</NavLink>
                                </h6>
                            </div>
                            <div className="col-md-2">
                                <h6 className="text-uppercase fw-bold">
                                    <NavLink to={"/about"} className="text-white text-decoration-none">About</NavLink>
                                </h6>
                            </div>
                            <div className="col-md-2">
                                <h6 className="text-uppercase fw-bold">
                                    <NavLink to={"/contact"} className="text-white text-decoration-none">Contact</NavLink>
                                </h6>
                            </div>
                        </div>
                    </section>
                    <hr className="my-4 opacity-50" />
                    <section className="mb-2">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <p className="text-light mt-3">
                                    At HydroMart, we offer high-quality water purifiers that
                                    combine modern technology with reliable performance to
                                    ensure pure drinking water for you and your family.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="text-center my-3">
                        <a href="" className="text-white me-4">
                            <i className="bi bi-facebook"></i>
                        </a>
                        <a href="" className="text-white me-4">
                            <i className="bi bi-google"></i>
                        </a>
                        <a href="" className="text-white me-4">
                            <i className="bi bi-instagram"></i>
                        </a>
                        <a href="" className="text-white me-4">
                            <i className="bi bi-youtube"></i>
                        </a>
                    </section>
                </div>

                <div className="text-center p-3" style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
                    © 2026 Copyright:
                    <NavLink to="/" className={"ms-2 text-white text-decoration-none"}>HydroMart</NavLink>
                </div>
            </footer>
        </>
    )
}

export default Footer
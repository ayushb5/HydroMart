import { NavLink, useNavigate } from "react-router-dom"
import HydroMart from "/HydroMart.png"

function Header() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role") || sessionStorage.getItem("role");

    function handleLogout() {
        localStorage.removeItem("role");
        sessionStorage.removeItem("role");
        navigate("/login");
        window.location.reload();
    }
    return (
        <>
            <nav className='navbar navbar-expand-sm bg-light fixed-top'>
                <div className="container-fluid">
                    <NavLink to="/" className="navbar-brand">
                        <div>
                            <img src={HydroMart} className="img-fluid" alt="HydroMart" style={{ height: "40px", width: "auto" }} />
                        </div>
                    </NavLink >
                    <button className="navbar-toggler"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div id="navbarNav" className="collapse navbar-collapse justify-content-center">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <NavLink to="/" className={({ isActive }) => {
                                    return isActive ? "nav-link text-primary fw-bold" : "nav-link"
                                }}>Home</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink to="/products" className={({ isActive }) => {
                                    return isActive ? "nav-link dropdown-toggle text-primary fw-bold" : "nav-link dropdown-toggle"
                                }} role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</NavLink>

                                <ul className="dropdown-menu">
                                    <li>
                                        <NavLink to={"/products"} className="dropdown-item">
                                            All Products
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/compare"} className="dropdown-item">
                                            Compare Products                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/gallery" className={({ isActive }) => {
                                    return isActive ? "nav-link text-primary fw-bold" : "nav-link"
                                }}>Gallery</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" className={({ isActive }) => {
                                    return isActive ? "nav-link text-primary fw-bold" : "nav-link"
                                }}>About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contact" className={({ isActive }) => {
                                    return isActive ? "nav-link text-primary fw-bold" : "nav-link"
                                }}>Contact</NavLink>
                            </li>

                        </ul>

                        <div className="d-flex justify-content-center">
                            {role ? (
                                <>
                                    {role === "admin" && (
                                        <NavLink to="/admin/dashboard" className="btn btn-outline-success me-2">Admin Dashboard</NavLink>
                                    )}
                                    <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                                </>

                            ) : (
                                <NavLink to="/login" className="btn btn-outline-primary">
                                    Login
                                </NavLink>
                            )}
                        </div>

                    </div>
                </div>
            </nav >
        </>
    )
}

export default Header
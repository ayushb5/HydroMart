import { NavLink, Outlet, useNavigate } from 'react-router-dom'

function Sidebar() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("role");
        sessionStorage.removeItem("role");
        navigate("/login");
        window.location.reload();
    }

    const sidebar = [
        { icon: "bi-grid", title: "Dashboard", path: "/admin/dashboard" },
        { icon: "bi-plus-square", title: "Add Product", path: "/admin/addProduct" },
        { icon: "bi-box-seam", title: "Products", path: "/admin/allProducts" }
    ]
    return (
        <>
            <div className="d-flex">
                <div className="sidebar">
                    <div className="nav flex-column">
                        {sidebar.map((item, i) => {
                            return (
                                <NavLink key={i} to={item.path} className={({ isActive }) => {
                                    return isActive ? "nav-link sidebar-link bg-warning text-dark" : "nav-link sidebar-link text-white"
                                }}>
                                    <i className={`bi ${item.icon} me-4 mb-2 fs-4`}></i>
                                    <span className='fs-5'>{item.title}</span>
                                </NavLink>
                            )
                        })}
                    </div>

                    <div className="mt-auto p-3 d-flex justify-content-center align-items-center logout">
                        <button className="btn btn-danger" onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right me-2"></i>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
                <div className="flex-grow-1 p-4 bg-light">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Sidebar
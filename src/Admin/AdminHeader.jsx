import { NavLink, Outlet } from "react-router-dom"

function AdminHeader() {
    return (
        <>
            <div className="container">
                <div className="header-nav my-3 d-flex justify-content-center align-items-center">
                    <NavLink to="dashboard" className={"btn btn-outline-primary me-2"}>Dashboard</NavLink>
                    <NavLink to="addProduct" className={"btn btn-outline-primary me-2"}>Add Product</NavLink>
                    <NavLink to="allProducts" className={"btn btn-outline-primary"}>All Product</NavLink>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default AdminHeader
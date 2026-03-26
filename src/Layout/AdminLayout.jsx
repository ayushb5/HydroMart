import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
    return (
        <>
            <div className="sidebar">
                <Sidebar />
            </div>

            <div style={{ marginLeft: "250px", padding: "20px" }}>
                <Outlet />
            </div>
        </>
    );
}

export default AdminLayout;
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <>
            <div className="main-layout">
                <Header />
                <Outlet />
                <Footer />
            </div>
        </>
    );
}

export default MainLayout;
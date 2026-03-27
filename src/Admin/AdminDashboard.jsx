import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

function AdminDashboard() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role") || sessionStorage.getItem("role");
    const [data, setData] = useState([]);
    function getProductData() {
        axios.get(import.meta.env.VITE_BASE_URL + "/products")
            .then((res) => {
                setData(res.data);
            })
    }
    let userCount = 100, orderCount = 50;

    const cards = [
        {
            count: userCount,
            title: "Registered Users",
            icon: "bi-person-fill",
            color: "#F5B427",
            path: null
        },
        {
            count: data.length,
            title: "Products",
            icon: "bi-box-seam-fill",
            color: "#27F557",
            path: "/admin/allProducts"
        },
        {
            count: orderCount,
            title: "Total Orders",
            icon: "bi-cart-fill",
            color: "#27CCF5",
            path: null
        }
    ]

    useEffect(() => {
        if (role != "admin") {
            navigate("/login");
        }
        getProductData();
    }, []);

    return (
        <>
            <div className="container">
                <div className="allCards d-flex align-items-center justify-content-center gap-5 flex-wrap mt-5">
                    {cards.map((card, index) => (
                        <div key={index} onClick={() => card.path && navigate(card.path)} className="card w-auto d-inline-block p-3 mb-2 cursor-pointer" style={{ backgroundColor: `${card.color}` }}>
                            <div className="row align-items-center">
                                <div className="col-auto text-center">
                                    <h2>{card.count}</h2>
                                    <h3>{card.title}</h3>
                                </div>
                                <div className="col-auto">
                                    <i className={`bi ${card.icon} fs-1`}></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default AdminDashboard;
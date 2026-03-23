import { useFormik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
function Login() {
    const [showPass, setshowPass] = useState(false);
    const [loginData, setloginData] = useState({
        email: "",
        password: ""
    })
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();

    const admin = {
        email: "admin123@gmail.com",
        password: "Admin@9876"
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },

        onSubmit: (values) => {
            console.log(values);
        }
    });

    function handleChange(e) {
        setloginData({
            ...loginData,
            [e.target.id]: e.target.value
        })
    }

    function handleLogin(e) {
        e.preventDefault();
        if (loginData.email === admin.email && loginData.password === admin.password) {
            if (rememberMe) {
                localStorage.setItem("role", "admin");
            } else {
                sessionStorage.setItem("role", "admin");
            }
            navigate("/admin/dashboard");
        } else {
            alert("Invalid Credentials");
        }

        setloginData({
            email: "",
            password: ""
        })
    }

    return (
        <>
            <div className="authBg flexbox">
                <div className="container flexbox vh-100">
                    <div className="card shadow p-4" style={{ width: "500px" }}>
                        <h2 className="text-center mb-4">Login</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-floating mb-3">
                                <input type="email" id="email" onChange={formik.handleChange} value={formik.values.email} className="form-control" placeholder="Email" />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-group mb-3">
                                <div className="form-floating">
                                    <input type={showPass ? "text" : "password"} id="password" className="form-control" onChange={formik.handleChange} value={formik.values.password} placeholder="Password" />
                                    <label htmlFor="password">Password</label>
                                </div>
                                <span className="input-group-text bg-white cursor-pointer"
                                    onClick={() => setshowPass(!showPass)}
                                >
                                    <i className={`bi ${showPass ? "bi-eye" : "bi-eye-slash"} fs-5`}></i>
                                </span>
                            </div>

                            <div className="row align-items-center">
                                <div className="col-lg-6 col-md-6 col-6">
                                    <div className="form-check user-select-none">
                                        <input type="checkbox" className="form-check-input cursor-pointer" id="remember" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                                        <label htmlFor="remember" className="cursor-pointer">Remember me</label>
                                    </div>
                                </div>
                                <div className="col-md-6 col-6 text-end">
                                    <a href="#" className="text-decoration-none">Forgot password?</a>
                                </div>
                            </div>

                            <div className="flexbox mt-3">
                                <button className="w-50 btn btn-primary" type="submit">Login</button>
                            </div>

                            <div className="text-center mt-3">
                                <span className="me-1">Don't have an account?</span>
                                <NavLink
                                    to="/signup"
                                    className="text-decoration-none fw-semibold"
                                >
                                    Sign up
                                </NavLink>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    )
}

export default Login
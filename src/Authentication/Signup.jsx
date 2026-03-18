import { useState } from "react";
import { NavLink } from "react-router-dom";
function Signup() {
    const [showPass, setshowPass] = useState(false);
    const [showConfirmPass, setshowConfirmPass] = useState(false);
    return (
        <>
            <div className="authBg flexbox">
                <div className="container flexbox vh-100">
                    <div className="card shadow p-4" style={{ width: "500px" }}>
                        <h2 className="text-center mb-4">Sign up</h2>
                        <form>
                            <div className="form-floating mb-3">
                                <input type="text" id="name" className="form-control" placeholder="Name" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email" id="email" className="form-control" placeholder="Email" />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-group mb-3">
                                <div className="form-floating">
                                    <input type={showPass ? "text" : "password"} id="password" className="form-control" placeholder="Password" />
                                    <label htmlFor="password">Password</label>
                                </div>
                                <span className="input-group-text bg-white cursor-pointer"
                                    onClick={() => setshowPass(!showPass)}>
                                    <i className={`bi ${showPass ? "bi-eye" : "bi-eye-slash"} fs-5`}></i>
                                </span>
                            </div>
                            <div className="input-group mb-3">
                                <div className="form-floating">
                                    <input type={showConfirmPass ? "text" : "password"} id="confirmPassword" className="form-control" placeholder="Confirm Password" />
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                </div>
                                <span className="input-group-text bg-white cursor-pointer"
                                    onClick={() => setshowConfirmPass(!showConfirmPass)}>
                                    <i className={`bi ${showConfirmPass ? "bi-eye" : "bi-eye-slash"} fs-5`}></i>
                                </span>
                            </div>

                            <div className="flexbox mt-3">
                                <button className="w-50 btn btn-primary">Sign up</button>
                            </div>

                            <div className="text-center mt-3">
                                <span className="me-1">Already have an account?</span>
                                <NavLink
                                    to="/login"
                                    className="text-decoration-none fw-semibold"
                                >
                                    Login
                                </NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Signup;
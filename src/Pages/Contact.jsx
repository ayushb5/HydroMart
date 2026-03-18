import { useState } from "react";
import axios from "axios";

function Contact() {
    const [data, setData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    function handleChange(e) {
        setData({ ...data, [e.target.id]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://69ae5d0fc8b37f4998353805.mockapi.io/contact", data);
            console.log("Success ", response.data);
            alert("Message sent succesfully.")
            setData({
                name: "",
                email: "",
                subject: "",
                message: ""
            })
        } catch (error) {
            console.log("Error: ", error)
        }
    }
    return (
        <>
            <h1 className='text-center'>Contact Us</h1>
            <div className="container mb-4">
                <div className="row shadow d-flex align-items-center" style={{ backgroundColor: "rgba(227, 218, 218, 0.74)" }}>
                    <div className="col-lg-6 d-flex justify-content-center">
                        <form id='contactForm' className='mt-2 w-100 p-5'>
                            <div className="d-flex gap-1 contactField">
                                <div className="mb-3 w-100">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id='name' value={data.name} onChange={handleChange} className='form-control p-2 mt-2' placeholder='Name' required />
                                </div>
                                <div className="mb-3 w-100">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id='email' value={data.email} onChange={handleChange} className='form-control p-2 mt-2' placeholder='Email' required />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mob_no">Subject</label>
                                <input type="text" id="subject" value={data.subject} onChange={handleChange} className='form-control p-2 mt-2' placeholder='Subject' required />
                            </div>
                            <div className="mb-3 d-flex flex-column">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" value={data.message} onChange={handleChange} className='form-control p-2 mt-2' style={{ height: "120px" }} placeholder="Message" required></textarea>
                            </div>
                            <div className="text-center">
                                <button className='btn btn-primary rounded' onClick={handleSubmit}>Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-6 mt-2">
                        <div className="container p-2 h-50vh text-light" style={{ backgroundColor: "rgb(58, 13, 135)" }}>
                            <h3 className='text-center pt-2'>Visit Us</h3>

                            <div className="d-flex flex-column mt-4">
                                <h5 className='text-center mb-3'><i className='bi bi-geo-alt me-2'></i>Address</h5>
                                <p className='fw-semibold text-center m-0 p-0'>HydroMart Water Solutions</p>
                                <p className='text-center text-light'>Office No. 204, Crystal Business Center
                                    FC Road, Shivajinagar</p>
                            </div>
                            <div className="d-flex flex-column mt-4">
                                <h5 className='text-center mb-3'><i className='bi bi-envelope-fill me-2'></i>Email</h5>
                                <p className='text-center text-light m-0 p-0'>hydromart@gmail.com</p>
                            </div>
                            <div className="d-flex flex-column mt-5">
                                <h5 className='text-center mb-3'><i className='bi bi-telephone-fill me-2'></i>Phone Number</h5>
                                <p className='text-center text-light m-0 p-0'>+91 9123456789</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact
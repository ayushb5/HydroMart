import React, { useEffect, useState } from 'react'
import { getStates, getCities } from '../api/locationAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';


function BillingPage() {

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();
    const { subtotal = 0, shipping = 50, tax = 0, total = 0 } = location.state || {};

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        mobile: Yup.string()
            .matches(/^[0-9]{10}$/, 'Enter valid 10-digit number')
            .required('Mobile number is required'),
        state: Yup.string().required('State is required'),
        city: Yup.string().required('City is required'),
        postalCode: Yup.string().required('Postal code is required'),
        address: Yup.string().required('Address is required'),
        paymentMethod: Yup.string().required('Select a payment method')
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            mobile: '',
            country: 'India',
            state: '',
            city: '',
            postalCode: '',
            address: '',
            paymentMethod: ''
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const payload = {
                    ...values,
                    subtotal,
                    shipping,
                    tax,
                    total,
                    paymentStatus: "pending"
                };

                const response = await axios.post('https://69ae5d0fc8b37f4998353805.mockapi.io/billing', payload);

                console.log("Order placed:", response.data);

                resetForm();

                if (values.paymentMethod === "upi") {
                    navigate("/payment", {
                        state: { order: response.data }
                    });
                } else if (values.paymentMethod === "cod") {
                    navigate("/order-success", {
                        state: { order: response.data }
                    });
                }

            } catch (error) {
                console.error("Error placing order:", error);
                alert("Something went wrong!");
            } finally {
                setSubmitting(false);
            }
        }
    });

    useEffect(() => {
        const loadStates = async () => {
            try {
                const res = await getStates();
                // console.log("States API response:", res.data);
                setStates(res.data);
            } catch (err) {
                console.log("Error fetching states: ", err);
            }
        };

        loadStates();
    }, []);

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-md-8">
                            <div className="form mx-3 mb-5 p-3" style={{ backgroundColor: "#F5F5F5" }}>
                                <h3 className='mt-4'>Billing Details</h3>
                                <div className="row mb-4">
                                    <div className="col">
                                        <label htmlFor="name" className='form-label'>Name</label>
                                        <input type="text" name='name' id='name' className='form-control w-100' placeholder='Your Name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                                        {formik.touched.name && formik.errors.name && (
                                            <div className='text-danger'>{formik.errors.name}</div>
                                        )}
                                    </div>
                                    <div className="col">
                                        <label htmlFor="mob_no" className='form-label'>Mobile Number</label>
                                        <input type="number" name='mobile' id='mob_no' className='form-control w-100' placeholder='Your Mobile Number' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.mobile} />
                                        {formik.touched.mobile && formik.errors.mobile && (
                                            <div className='text-danger'>{formik.errors.mobile}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <label htmlFor="country" className='form-label'>Select Country</label>
                                        <select
                                            name="country"
                                            id="country"
                                            className="form-select w-100"
                                            value={formik.values.country}
                                            onChange={formik.handleChange}
                                        >
                                            <option value="India">India</option>
                                        </select>                                    </div>
                                    <div className="col">
                                        <label htmlFor="state" className='form-label'>Select State</label>
                                        <select name="state" id="state" className='form-select w-100' value={formik.values.state}
                                            onChange={async (e) => {
                                                const stateCode = e.target.value;
                                                formik.setFieldValue("state", stateCode);
                                                formik.setFieldValue("city", "");

                                                try {
                                                    const res = await getCities(stateCode);
                                                    setCities(res.data);
                                                } catch (err) {
                                                    console.error("Error fetching cities ", err);
                                                }
                                            }} onBlur={formik.handleBlur}>
                                            <option value="">Select State</option>
                                            {states.map((state) => (
                                                <option key={state.iso2} value={state.iso2}>
                                                    {state.name}
                                                </option>
                                            ))}
                                        </select>
                                        {formik.touched.state && formik.errors.state && (
                                            <div className="text-danger">{formik.errors.state}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <label htmlFor="city" className='form-label'>Select City</label>
                                        <select name="city" id="city" className='form-select' value={formik.values.city}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            disabled={!formik.values.state}>
                                            <option value="">Select City</option>
                                            {cities.map((city, index) => (
                                                <option key={index} value={city.name}>{city.name}</option>
                                            ))}
                                        </select>
                                        {formik.touched.city && formik.errors.city && (
                                            <div className="text-danger">{formik.errors.city}</div>
                                        )}
                                    </div>

                                    <div className="col">
                                        <label htmlFor="postal-code" className='form-label'>Zip/Postal Code</label>
                                        <input type="text" id='postal-code' name='postalCode' className='form-control' placeholder='Zip/Postal' value={formik.values.postalCode} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        {formik.touched.postalCode && formik.errors.postalCode && (
                                            <div className="text-danger">{formik.errors.postalCode}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="field mb-4">
                                    <label htmlFor="address" className='form-label'>Address</label>
                                    <input type="text" name='address' id='address' className='form-control' placeholder='Enter Your Address' value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                    {formik.touched.address && formik.errors.address && (
                                        <div className="text-danger">{formik.errors.address}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="cart p-3 mb-3" style={{ backgroundColor: "#F5F5F5" }}>
                                <h3 className='mt-4'>Cart Total</h3>

                                <div className="d-flex justify-content-between mb-3">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span>Shipping</span>
                                    <span>₹{shipping}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span>GST (18%)</span>
                                    <span>₹{tax.toLocaleString()}</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between mb-4">
                                    <strong>Total</strong>
                                    <strong>₹{total.toLocaleString()}</strong>
                                </div>
                            </div>

                            <div className="payment-method p-3" style={{ backgroundColor: "#F5F5F5" }}>
                                <h3>Payment Method</h3>
                                <div className="form-check my-2">
                                    <input type="radio" className="form-check-input" id="upi" name="paymentMethod" value="upi" onChange={formik.handleChange} onBlur={formik.handleBlur} checked={formik.values.paymentMethod === "upi"} />UPI
                                    <label className="form-check-label" htmlFor="upi"></label>
                                </div>
                                <div className="form-check my-2">
                                    <input type="radio" className="form-check-input" id="cod" name="paymentMethod" value="cod" onChange={formik.handleChange} onBlur={formik.handleBlur} checked={formik.values.paymentMethod === "cod"} />Cash on Delivery
                                    <label className="form-check-label" htmlFor="cod"></label>
                                </div>

                                {formik.touched.paymentMethod && formik.errors.paymentMethod && (
                                    <div className="text-danger">{formik.errors.paymentMethod}</div>
                                )}
                            </div>

                            <div className="text-center">
                                <button className='mt-3 btn btn-success' type='submit' disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}>Place an Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default BillingPage
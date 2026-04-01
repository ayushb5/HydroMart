import React, { useEffect, useState } from 'react'
import { getStates, getCities } from '../api/locationAPI';
import { useLocation } from 'react-router-dom';

function BillingPage() {

    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");

    const location = useLocation();
    const { subtotal = 0, shipping = 50, tax = 0, total = 0 } = location.state || {};

    const fetchStates = async () => {
        try {
            const res = await getStates();
            setStates(res.data);
        } catch (err) {
            console.log("Error fetching states: ", err);
        }
    }

    const handleStateChange = async (e) => {
        const stateCode = e.target.value;
        setSelectedState(stateCode);

        try {
            const res = await getCities(stateCode);
            setCities(res.data);
        } catch (err) {
            console.error("Error fetching cities", err);
        }
    };

    useEffect(() => {
        fetchStates();
    }, []);

    return (
        <>
            <div className="container">
                <div className="row mt-3">
                    <div className="col-md-8">
                        <div className="form mx-3 mb-5 p-3" style={{ backgroundColor: "#F5F5F5" }}>
                            <h3 className='mt-4'>Billing Details</h3>
                            <div className="row mb-4">
                                <div className="col">
                                    <label htmlFor="name" className='form-label'>Name</label>
                                    <input type="text" id='name' className='form-control w-100' placeholder='Your Name' />
                                </div>
                                <div className="col">
                                    <label htmlFor="mob_no" className='form-label'>Mobile Number</label>
                                    <input type="text" id='mob_no' className='form-control w-100' placeholder='Your Mobile Number' />
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col">
                                    <label htmlFor="country" className='form-label'>Select Country</label>
                                    <select name="country" id="country" className='form-select w-100'>
                                        <option value="India">India</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label htmlFor="state" className='form-label'>Select State</label>
                                    <select name="state" id="state" className='form-select w-100' value={selectedState}
                                        onChange={handleStateChange}>
                                        <option value="">Select State</option>
                                        {states.map((state) => (
                                            <option key={state.iso2} value={state.iso2}>
                                                {state.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col">
                                    <label htmlFor="city" className='form-label'>Select City</label>
                                    <select name="city" id="city" className='form-select' value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.target.value)}
                                        disabled={!selectedState}>
                                        <option value="">Select City</option>
                                        {cities.map((city, index) => (
                                            <option key={index} value={city.name}>{city.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col">
                                    <label htmlFor="postal-code" className='form-label'>Zip/Postal Code</label>
                                    <input type="text" id='postal-code' className='form-control' placeholder='Zip/Postal' />
                                </div>
                            </div>
                            <div className="field mb-4">
                                <label htmlFor="address" className='form-label'>Address</label>
                                <input type="text" id='address' className='form-control' placeholder='Enter Your Address' />
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
                                <input type="radio" className="form-check-input" id="upi" name="paymentMethod" value="upi" />UPI
                                <label className="form-check-label" htmlFor="upi"></label>
                            </div>
                            <div className="form-check my-2">
                                <input type="radio" className="form-check-input" id="cod" name="paymentMethod" value="cod" />Cash on Delivery
                                <label className="form-check-label" htmlFor="cod"></label>
                            </div>
                        </div>

                        <div className="text-center">
                            <button className='mt-3 btn btn-success' disabled={!selectedState || !selectedCity}>Place an Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BillingPage
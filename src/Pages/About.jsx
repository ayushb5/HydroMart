import React from 'react'

function About() {
    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-lg-6 d-flex justify-content-center align-items-center flex-column border-end">
                        <img src="/HydroMart.png" className='img-fluid' alt="" />
                        <img src="RO_purifier.png" className='img-fluid' alt="" />
                    </div>
                    <div className="col-lg-6 d-flex align-items-center flex-column">
                        <h2 className='fw-bold my-3' style={{ color: "darkblue" }}>About HydroMart</h2>
                        <p className='fs-6 mt-3 mx-2' style={{ textAlign: "justify" }}>HydroMart is a dedicated e-commerce platform designed to make buying water purifiers simple, reliable, and convenient. Our mission is to help every household access clean and safe drinking water by offering a wide range of high-quality water purifiers from trusted brands. At HydroMart, customers can easily compare different purification technologies such as RO, UV, UF, and Alkaline systems to find the purifier that best suits their needs. We focus on providing genuine products, transparent information, and a smooth online shopping experience. With a commitment to quality, affordability, and customer satisfaction, HydroMart aims to become a trusted destination for water purification solutions. 💧</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About
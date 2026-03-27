import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function AddProduct() {

    const navigate = useNavigate();
    const role = localStorage.getItem("role") || sessionStorage.getItem("role");

    const [productData, setProductData] = useState({
        productName: "",
        brandName: "",
        productImgUrl: "",
        price: "",
        discount: "",
        technology: "",
        capacity: "",
        description: "",
        warranty: ""
    });

    function handleChange(e) {
        let value = e.target.value;

        if (e.target.id === "capacity") {
            value = Number(value);
        }
        setProductData({ ...productData, [e.target.id]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios.post(import.meta.env.VITE_BASE_URL + "/products", productData)
            .then((res) => {
                alert("Product added succesfully.");
                console.log(res.data);

                setProductData({
                    productName: "",
                    brandName: "",
                    productImgUrl: "",
                    price: "",
                    discount: "",
                    technology: "",
                    capacity: "",
                    description: "",
                    warranty: ""
                })
            })
    }

    useEffect(() => {
        if (role != "admin") {
            navigate("/login");
        }
    }, [])
    return (
        <>
            <div className="container">
                <h1 className="text-center">Add your new Product</h1>
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <form className="p-3" onSubmit={handleSubmit}>
                            <div className="row mb-4 gap-5">
                                <div className="col-lg-7 shadow p-3 rounded">
                                    <h4>General Information</h4>

                                    <div className="field w-75">
                                        <label htmlFor="productName" className="text-muted form-label">Product name</label>
                                        <input type="text" id="productName" onChange={handleChange} value={productData.productName} className="form-control" required />
                                    </div>

                                    <div className="field w-75">
                                        <label htmlFor="brand" className="text-muted form-label">Brand name</label>
                                        <input type="text" id="brandName" onChange={handleChange} value={productData.brandName} className="form-control" required />
                                    </div>
                                </div>

                                <div className="col-lg-4 shadow p-3 rounded">
                                    <h4>Product Media</h4>
                                    <div className="field">
                                        <label htmlFor="productImgUrl" className="form-label">Image URL</label>
                                        <input type="URL" id="productImgUrl" onChange={handleChange} value={productData.productImgUrl} className="form-control" required />
                                    </div>

                                    <div className="field">
                                        <label htmlFor="productImg" className="form-label">Upload Image</label>
                                        <input type="file" id="productImg" className="form-control" accept="image/*" />
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-4 gap-5">
                                <div className="col-lg-7 shadow p-3 rounded">
                                    <h3>Pricing</h3>

                                    <div className="field w-75">
                                        <label htmlFor="price" className="form-label">Price</label>
                                        <div className="input-group">
                                            <span className="input-group-text">₹</span>
                                            <input type="number" id="price" onChange={handleChange} value={productData.price} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="field w-75">
                                        <label htmlFor="discount" className="form-label">Discount Price</label>
                                        <div className="input-group">
                                            <span className="input-group-text">₹</span>
                                            <input type="number" id="discount" onChange={handleChange} value={productData.discount} className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 shadow p-3 rounded">
                                    <h3>Category</h3>
                                    <div className="field">
                                        <label htmlFor="technology" className="form-label">Purification Technology</label>
                                        <select id="technology" onChange={handleChange} value={productData.technology} className="form-select">
                                            <option value="">Select Technology</option>
                                            <option value="RO">RO</option>
                                            <option value="UV">UV</option>
                                            <option value="UF">UF</option>
                                            <option value="RO + UV">RO + UV</option>
                                            <option value="RO + UV + UF">RO + UV + UF</option>
                                            <option value="RO + UV + UF + TDS">RO + UV + UF + TDS</option>
                                            <option value="RO + Alkaline">RO + Alkaline</option>
                                            <option value="RO + Copper">RO + Copper</option>
                                            <option value="Gravity (UF)">Gravity (UF)</option>
                                        </select>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="capacity" className="form-label">Capacity</label>
                                        <select id="capacity" onChange={handleChange} value={productData.capacity} className="form-select">
                                            <option value="">Select Capacity</option>
                                            <option value="7">7 L</option>
                                            <option value="8">8 L</option>
                                            <option value="9">9 L</option>
                                            <option value="10">10 L</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-4 gap-5">
                                <div className="col-lg-7 shadow p-3 rounded">
                                    <div className="field">
                                        <h3>Description</h3>
                                        <textarea type="text" id="description" onChange={handleChange} value={productData.description} rows={4} className="form-control" placeholder="Product information" required />
                                    </div>
                                </div>
                                <div className="col-lg-4 shadow p-3 rounded">
                                    <h3>Warranty</h3>
                                    <div className="field w-75">
                                        <label htmlFor="warranty" className="form-label">Warranty</label>
                                        <select id="warranty" onChange={handleChange} value={productData.warranty} className="form-select">
                                            <option value="">Select Warranty</option>
                                            <option value="No Warranty">No Warranty</option>
                                            <option value="6 Months Warranty">6 Months</option>
                                            <option value="1 Year Warranty">1 Year</option>
                                            <option value="2 Years Warranty">2 Years</option>
                                            <option value="3 Years Warranty">3 Years</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-center mt-5">
                                <button className="btn btn-primary">Add Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProduct
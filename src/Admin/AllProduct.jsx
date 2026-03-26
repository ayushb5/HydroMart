import axios from "axios";
import { useEffect, useState } from "react";

function AllProduct() {
    const [productData, setProductData] = useState([]);
    const [userId, setUserId] = useState(0);
    const [data, setData] = useState({
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
        setData({ ...data, [e.target.id]: e.target.value });
    }

    function getData() {
        axios.get(import.meta.env.VITE_BASE_URL + "/products")
            .then(res => { setProductData(res.data) })
            .catch(err => { console.log(err) });
    }

    function getDataById(id) {
        setUserId(id);
        axios.get(import.meta.env.VITE_BASE_URL + "/products" + id)
            .then((res) => {
                setData(res.data);
            })
    }

    function handleUpdate(e) {
        e.preventDefault();
        axios.put(import.meta.env.VITE_BASE_URL + "/products/" + userId, {
            ...data, id: userId
        })
            .then((res) => {
                alert("Data Updated Succesfully");
                console.log(res.data);
                getData();
            })
    }

    function handleDelete() {
        if (userId) {
            axios.delete(import.meta.env.VITE_BASE_URL + "/products/" + userId)
                .then((res) => {
                    alert("Data Deleted Succesfully.");
                    console.log(res.data);
                    setUserId(0);
                    getData();
                })
        }
    }

    useEffect(() => {
        getData();
    }, [])
    return (
        <>
            <div className="container-fluid">
                <div className="table-responsive">
                    <table className="table adminProductTable">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Brand</th>
                                <th>Technology</th>
                                <th>Price</th>
                                <th>Discount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {productData.map((data, i) => {
                                return (
                                    <tr key={data.id}>
                                        <td>{i + 1}</td>
                                        <td><img src={data.productImgUrl} alt="img" className="img-fluid" width={120} /></td>
                                        <td>{data.productName}</td>
                                        <td className="fw-semibold">{data.brandName}</td>
                                        <td>{data.technology}</td>
                                        <td>₹{Number(data.price).toLocaleString()}</td>
                                        <td>₹{Number(data.discount).toLocaleString()}</td>
                                        <td>
                                            <div className="d-flex">
                                                <button className="btn btn-sm btn-primary me-2" onClick={() => getDataById(data.id)} data-bs-toggle="modal" data-bs-target="#updateModal">
                                                    <i className="bi bi-pencil-fill"></i>
                                                </button>
                                                <button className="btn btn-sm btn-danger" onClick={() => setUserId(data.id)} data-bs-toggle="modal" data-bs-target="#deleteModal">
                                                    <i className="bi bi-trash-fill"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Update Modal */}
                <div className="modal fade" id="updateModal">
                    <div className="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title mx-auto">Update Product details</h3>
                                <button className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <form className="p-3" onSubmit={handleUpdate}>

                                    <div className="row mb-4 gap-5 justify-content-center">
                                        <div className="col-lg-7 shadow p-3 rounded">
                                            <h4>General Information</h4>

                                            <div className="field w-75">
                                                <label htmlFor="productName" className="text-muted form-label">Product name</label>
                                                <input type="text" id="productName" onChange={handleChange} value={data.productName} className="form-control" required />
                                            </div>

                                            <div className="field w-75">
                                                <label htmlFor="brand" className="text-muted form-label">Brand name</label>
                                                <input type="text" id="brandName" onChange={handleChange} value={data.brandName} className="form-control" required />
                                            </div>
                                        </div>

                                        <div className="col-lg-4 shadow p-3 rounded">
                                            <h4>Product Media</h4>
                                            <div className="field">
                                                <label htmlFor="productImgUrl" className="form-label">Image URL</label>
                                                <input type="URL" id="productImgUrl" onChange={handleChange} value={data.productImgUrl} className="form-control" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-4 gap-5 justify-content-center">
                                        <div className="col-lg-7 shadow p-3 rounded">
                                            <h3>Pricing</h3>

                                            <div className="field w-75">
                                                <label htmlFor="price" className="form-label">Price</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">₹</span>
                                                    <input type="number" id="price" onChange={handleChange} value={data.price} className="form-control" />
                                                </div>
                                            </div>
                                            <div className="field w-75">
                                                <label htmlFor="discount" className="form-label">Discount Price</label>
                                                <div className="input-group">
                                                    <span className="input-group-text">₹</span>
                                                    <input type="number" id="discount" onChange={handleChange} value={data.discount} className="form-control" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-4 shadow p-3 rounded justify-content-center">
                                            <h3>Category</h3>
                                            <div className="field">
                                                <label htmlFor="technology" className="form-label">Purification Technology</label>
                                                <select id="technology" onChange={handleChange} value={data.technology} className="form-select">
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
                                                <select id="capacity" onChange={handleChange} value={data.capacity} className="form-select">
                                                    <option value="">Select Capacity</option>
                                                    <option value="7">7 L</option>
                                                    <option value="8">8 L</option>
                                                    <option value="9">9 L</option>
                                                    <option value="10">10 L</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-4 gap-5 justify-content-center">
                                        <div className="col-lg-7 shadow p-3 rounded">
                                            <div className="field">
                                                <h3>Description</h3>
                                                <textarea type="text" id="description" onChange={handleChange} value={data.description} rows={4} className="form-control" placeholder="Product information" required />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 shadow p-3 rounded">
                                            <h3>Warranty</h3>
                                            <div className="field w-75">
                                                <label htmlFor="warranty" className="form-label">Warranty</label>
                                                <select id="warranty" onChange={handleChange} value={data.warranty} className="form-select">
                                                    <option value="">Select Warranty</option>
                                                    <option value="No Warranty">No Warranty</option>
                                                    <option value="6 Months">6 Months</option>
                                                    <option value="1 Year">1 Year</option>
                                                    <option value="2 Years">2 Years</option>
                                                    <option value="3 Years">3 Years</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-end">
                                        <button className="btn btn-danger me-2" type="button" data-bs-dismiss="modal">Cancel</button>
                                        <button className="btn btn-success" type="submit" data-bs-dismiss="modal">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Delete Modal */}
                <div className="modal fade" id="deleteModal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title mx-auto">Confirmation</h3>
                                <button className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <h3 className="text-center">Are you sure you want to delete this product?</h3>
                                <div className="d-flex justify-content-end gap-2 mt-4">
                                    <button className="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
                                    <button className="btn btn-danger" onClick={handleDelete} data-bs-dismiss="modal">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllProduct
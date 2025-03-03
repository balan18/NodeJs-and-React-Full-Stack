import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const SalesForm = () => {
    const [sale, setSale] = useState({
        time: "",
        description: "",
        items: [{ name: "", quantity: 0, price: 0, total: 0 }],
        total: 0,
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const totalAmount = sale.items.reduce((acc, item) => acc + item.total, 0);
            await axios.post("http://localhost:5000/api/sales", { ...sale, total: totalAmount }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Sale created successfully");
        } catch (err) {
            alert("Error creating sale");
        } finally {
            setLoading(false);
        }
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...sale.items];
        newItems[index][field] = field === 'quantity' || field === 'price' ? Number(value) : value;

        if (field === 'quantity' || field === 'price') {
            newItems[index].total = newItems[index].quantity * newItems[index].price;
        }

        setSale({ ...sale, items: newItems });
    };

    return (
        <div className="container mt-5">
            {/* Header with "View Sales" button */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary">New Sale Entry</h2>
                <button className="btn btn-outline-primary" onClick={() => navigate("/sales-list")}>
                    View Sales
                </button>
            </div>

            <div className="card p-4 shadow-lg border-0">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Date & Time</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            value={sale.time}
                            onChange={(e) => setSale({ ...sale, time: e.target.value })}
                            disabled={loading}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter sale description"
                            value={sale.description}
                            onChange={(e) => setSale({ ...sale, description: e.target.value })}
                            disabled={loading}
                        />
                    </div>
                    <h4 className="text-secondary mt-4">Sale Items</h4>
                    {sale.items.map((item, index) => (
                        <div className="mb-3 p-3 border rounded bg-light" key={index}>
                            <div className="row g-2">
                                <div className="col-md-4">
                                    <label className="form-label">Item Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter item name"
                                        value={item.name}
                                        onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <label className="form-label">Quantity</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={item.quantity}
                                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <label className="form-label">Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={item.price}
                                        onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <label className="form-label">Total</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={item.total}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Submit Sale"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SalesForm;

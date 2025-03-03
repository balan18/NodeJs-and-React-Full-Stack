import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SalesList = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            alert("No token found");
            return;
        }

        const fetchSales = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/sales", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSales(res.data);
            } catch (err) {
                console.error("Error fetching sales:", err);
                setError("Failed to load sales data.");
            } finally {
                setLoading(false);
            }
        };

        fetchSales();
    }, [token]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this sale?")) return;

        const previousSales = [...sales]; // Save a copy

        setSales(sales.filter((sale) => sale._id !== id));

        try {
            await axios.delete(`http://localhost:5000/api/sales/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Sale deleted successfully");
        } catch (err) {
            console.error("Error deleting sale:", err);
            alert("Error deleting sale");
            setSales(previousSales); // Rollback on failure
        }
    };

    const handleUpdate = async (updatedSale) => {
        const previousSales = [...sales];

        setSales(sales.map((sale) => (sale._id === updatedSale._id ? updatedSale : sale)));

        try {
            await axios.put(`http://localhost:5000/api/sales/${updatedSale._id}`, updatedSale, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Sale updated successfully");
        } catch (err) {
            console.error("Error updating sale:", err);
            alert("Error updating sale");
            setSales(previousSales); // Rollback on failure
        }
    };

    if (loading) return <p className="text-center mt-5">Loading sales...</p>;
    if (error) return <p className="text-center text-danger mt-5">{error}</p>;
    if (sales.length === 0) return <p className="text-center mt-5">No sales available.</p>;

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Sales List</h2>
                <button className="btn btn-success" onClick={() => navigate("/sales")}>
                    + New Sale
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Time</th>
                            <th>Description</th>
                            <th>Total</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Item Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale) => (
                            <SaleRow key={sale._id} sale={sale} onDelete={handleDelete} onUpdate={handleUpdate} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const SaleRow = ({ sale, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedSale, setUpdatedSale] = useState({
        ...sale,
        items: sale.items.map(item => ({
            ...item,
            total: item.total ?? (item.quantity * item.price || 0),
        }))
    });

    const handleInputChange = (field, value) => {
        setUpdatedSale({ ...updatedSale, [field]: value });
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...updatedSale.items];

        newItems[index][field] = value;

        setUpdatedSale({ ...updatedSale, items: newItems });
    };

    const handleSave = () => {
        onUpdate(updatedSale);
        setIsEditing(false);
    };

    return updatedSale.items.map((item, index) => (
        <tr key={index}>
            {index === 0 && (
                <>
                    <td rowSpan={updatedSale.items.length}>
                        {isEditing ? (
                            <input
                                type="datetime-local"
                                className="form-control"
                                value={updatedSale.time}
                                onChange={(e) => handleInputChange("time", e.target.value)}
                            />
                        ) : (
                            new Date(updatedSale.time).toLocaleString()
                        )}
                    </td>
                    <td rowSpan={updatedSale.items.length}>
                        {isEditing ? (
                            <input
                                type="text"
                                className="form-control"
                                value={updatedSale.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                            />
                        ) : (
                            updatedSale.description
                        )}
                    </td>
                    <td rowSpan={updatedSale.items.length}>${updatedSale.total.toFixed(2)}</td>
                </>
            )}
            <td>
                {isEditing ? (
                    <input
                        type="text"
                        className="form-control"
                        value={item.name}
                        onChange={(e) => handleItemChange(index, "name", e.target.value)}
                    />
                ) : (
                    item.name
                )}
            </td>
            <td>{item.quantity}</td>
            <td>${item.total ? item.total.toFixed(2) : "0.00"}</td>
            {index === 0 && (
                <td rowSpan={updatedSale.items.length}>
                    {isEditing ? (
                        <button className="btn btn-success btn-sm me-2" onClick={handleSave}>
                            Update
                        </button>
                    ) : (
                        <button className="btn btn-warning btn-sm me-2" onClick={() => setIsEditing(true)}>
                            Edit
                        </button>
                    )}
                    <button className="btn btn-danger btn-sm" onClick={() => onDelete(sale._id)}>
                        Delete
                    </button>
                </td>
            )}
        </tr>
    ));
};

export default SalesList;

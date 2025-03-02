const Sales = require("../models/Sales");

// Create a new sales record
const createSale = async (req, res) => {
    try {
        const sale = new Sales(req.body);
        await sale.save();
        res.status(201).json(sale);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all sales records
const getSales = async (req, res) => {
    try {
        const sales = await Sales.find();
        res.json(sales);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a specific sales record by ID
const getSaleById = async (req, res) => {
    try {
        const sale = await Sales.findById(req.params.id);
        if (!sale) return res.status(404).json({ message: "Sale not found" });
        res.json(sale);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a sales record
const updateSale = async (req, res) => {
    console.log(req.body);
    try {
        const sale = await Sales.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!sale) return res.status(404).json({ message: "Sale not found" });
        res.json(sale);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a sales record
const deleteSale = async (req, res) => {
    try {
        const sale = await Sales.findByIdAndDelete(req.params.id);
        if (!sale) return res.status(404).json({ message: "Sale not found" });
        res.json({ message: "Sale deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createSale,
    getSales,
    getSaleById,
    updateSale,
    deleteSale,
};
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SalesForm from "./components/SalesForm";
import SalesList from "./components/SalesList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sales" element={<SalesForm />} />
        <Route path="/sales-list" element={<SalesList />} />
      </Routes>
    </Router>
  );
}

export default App;
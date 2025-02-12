import React, { useEffect, useState } from 'react';
import { fetchProducts, fetchOrders, addOrder, updateOrder, deleteOrder } from './api.jsx';
import ProductTable from './ProductTable';
import OrderTable from './OrderTable';
import OrderForm from './OrderForm';
import SearchFilter from './SearchFilter';
import ExportButtons from './ExportButtons';
import Footer from './Footer';
import './index.css';

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingOrder, setEditingOrder] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  useEffect(() => {
    fetchProducts().then(res => setProducts(res.data));
    fetchOrders().then(res => setOrders(res.data));
  }, []);

  // Handle adding an order
  function handleAddOrder(order){
    addOrder(order).then(() => {
      fetchOrders().then(res => setOrders(res.data));
      setShowForm(false); // Hide the form after submission
    });
  }

  // Handle updating an existing order
  function handleUpdateOrder(orderId, updatedOrder){
    updateOrder(orderId, updatedOrder).then(() => {
      fetchOrders().then(res => setOrders(res.data));
      setEditingOrder(null);
      setShowForm(false); // Hide the form after submission
    });
  }

  // Handle editing an order (pre-fill the form with existing order details)
  function handleEditOrder(order){
    setEditingOrder(order);
    setShowForm(true); // Show form for editing
  }

  // Handle deleting an order
  function handleDeleteOrder(orderId){
    deleteOrder(orderId).then(() => {
      fetchOrders().then(res => setOrders(res.data));
    });
  }

  return (
    <>
    <div className="container">
      <h1>E-Commerce Order Management System</h1>

      {/* Product Table */}
      <h2>List of Products</h2>
      <ProductTable products={products} />

      <div className="click-btn-container">
      {/* Button only visible when form is not shown */}
      {!showForm && (
        <button className="click-btn" onClick={() => { 
          setShowForm(true); 
          setEditingOrder(null); }}>
          CLICK TO PLACE ORDER!
        </button>
      )}
      </div>

      {/* Order Form (Visible only when showForm is true) */}
      {showForm && (
        <OrderForm
          products={products}
          existingOrder={editingOrder}
          onSubmit={editingOrder ? handleUpdateOrder : handleAddOrder}
          onClose={() => {
            setShowForm(false); // Hide the form when cancel or after submission
            setEditingOrder(null); // Reset editing order
          }}
        />
      )}

      <h2>Order Details</h2>

      {/* Search Filter */}
      <SearchFilter setSearchQuery={setSearchQuery} />

      {/* Order Table with search functionality */}
      <OrderTable orders={orders} searchQuery={searchQuery} onEdit={handleEditOrder} onDelete={handleDeleteOrder} />

      {/* Export Buttons */}
      <ExportButtons orders={orders} />

      <Footer />
    </div>
    </>
  );
}

export default App;

import React, { useState, useEffect } from 'react';

function OrderForm({ products, existingOrder, onSubmit, onClose}){

  const [order, setOrder] = useState({
    orderId: 0,
    customerId: '',
    customerName: '',
    productId: '',
    productName: '',
    productQuantity: 1,
    productPrice: 0,
    totalPrice: 0,
  });

  // If editing an existing order, populate the form fields
  useEffect(() => {
    if (existingOrder) {
      setOrder(existingOrder);
    }
  }, [existingOrder]);

  // Handle changes in the product dropdown
  function handleProductChange(e){
    const selectedProduct = products.find(p => p.prodName === e.target.value);
    setOrder({
      ...order,
      productId: selectedProduct.prodId,
      productName: selectedProduct.prodName,
      productPrice: selectedProduct.prodPrice,
      totalPrice: selectedProduct.prodPrice * order.productQuantity,
    });
  }

  // Handle changes in the product quantity (min 1)
  function handleQuantityChange(change){
    const newQuantity = Math.max(1, order.productQuantity + change);
    setOrder({ ...order, productQuantity: newQuantity, totalPrice: newQuantity * order.productPrice });
  }

  // Handle form submission
  function handleSubmit(e){
    e.preventDefault();
    if (existingOrder) {
      // If editing an existing order, pass orderId
      onSubmit(order.orderId, order);
    } else {
      // If adding a new order, omit orderId (let backend handle ID assignment)
      onSubmit(order);
    }
  }

  return (
    <div className="form-container">
      <h2>{existingOrder ? 'UPDATE ORDER' : 'PLACE ORDER'}</h2>
      <form onSubmit={handleSubmit} className="order-form">

        {/* Order ID */}
        <div className="form-group">
          <label htmlFor="orderId">Order ID</label>
          <input
            id="orderId"
            type="number"
            placeholder="1"
            value={order.orderId || ''}
            onChange={e => setOrder({ ...order, orderId: e.target.value })}
            required
            disabled={existingOrder} // Disable for editing
          />
        </div>

        {/* Customer ID */}
        <div className="form-group">
          <label htmlFor="customerId">Customer ID</label>
          <input
            id="customerId"
            type="text"
            placeholder="C101"
            value={order.customerId}
            onChange={e => setOrder({ ...order, customerId: e.target.value })}
            required
          />
        </div>

        {/* Customer Name */}
        <div className="form-group">
          <label htmlFor="customerName">Customer Name</label>
          <input
            id="customerName"
            type="text"
            placeholder="William James"
            value={order.customerName}
            onChange={e => setOrder({ ...order, customerName: e.target.value })}
            required
          />
        </div>

        {/* Product dropdown */}
        <div className="form-group">
          <label htmlFor="productName">Product</label>
          <select
            id="productName"
            onChange={handleProductChange}
            value={order.productName || ''}
            required
          >
            <option value="">Select Product</option>
            {products.map(p => (
              <option key={p.prodId} value={p.prodName}>
                {p.prodName}
              </option>
            ))}
          </select>
        </div>

        {/* Product ID (auto-filled when product is selected) */}
        <div className="form-group">
          <label htmlFor="productId">Product ID</label>
          <input
            id="productId"
            type="text"
            value={order.productId || ''}
            readOnly
          />
        </div>

        {/* Quantity control */}
        <div className="form-group">
          <label htmlFor="productQuantity">Quantity</label>
          <div className="quantity-control">
            <button type="button" onClick={() => handleQuantityChange(-1)}>
              <svg width="30" height="30" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path d="M256,32C132.3,32,32,132.3,32,256s100.3,224,224,224s224-100.3,224-224S379.7,32,256,32z M384,272H128v-32h256V272z"/>
              </svg>
            </button>
            <input
              type="number"
              value={order.productQuantity}
              readOnly
            />
            <button type="button" onClick={() => handleQuantityChange(1)}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                <path d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M37,26H26v11h-2V26H13v-2h11V13h2v11h11V26z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Price and Total */}
        <div className="form-group">
          <label htmlFor="productPrice">Price</label>
          <input
            id="productPrice"
            type="text"
            value={order.productPrice || ''}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalPrice">Total Price</label>
          <input
            id="totalPrice"
            type="text"
            value={order.totalPrice || ''}
            readOnly
          />
        </div>

        {/* Submit and Cancel buttons */}
        <div className="form-actions">
          <button type="submit">{existingOrder ? 'Update' : 'Submit'}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default OrderForm;

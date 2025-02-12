import axios from 'axios';

// const BASE_URL = 'http://localhost:8080';
const BASE_URL = 'https://eoms-backend-production.up.railway.app/';  // Update with backend URL

// Fetch all products from backend
export const fetchProducts = () => axios.get(`${BASE_URL}/products/all`);

// Fetch all orders from backend
export const fetchOrders = () => axios.get(`${BASE_URL}/orders/all`);

// // Add a new order
export const addOrder = (order) => axios.post(`${BASE_URL}/orders/add`, order);

// Update an existing order
export const updateOrder = (orderId, updatedOrder) => axios.put(`${BASE_URL}/orders/update/${orderId}`, updatedOrder);

// Delete an order by ID
export const deleteOrder = (orderId) => axios.delete(`${BASE_URL}/orders/delete/${orderId}`);

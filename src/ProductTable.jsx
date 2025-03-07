import React from 'react';

function ProductTable({ products }){
  return (
    <div className="table-wrapper">
    <table className="product-table">
      <thead>
        <tr>
          <th>S.NO.</th>  
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products.map(product => (
            <tr key={product.serialNum}>
              <td>{product.serialNum}</td>
              <td>{product.prodId}</td>
              <td>{product.prodName}</td>
              <td>{product.prodPrice}</td>
            </tr>
          ))
        ) : (
          <tr><td colSpan="4">No products available!</td></tr>
        )}
      </tbody>
    </table>
    </div>
  );
}

export default ProductTable;

import React, { useState, useEffect } from 'react';
import { API_URL } from '../../data/apiPath';

const GetFirms = ({showProductsHandler}) => {
  const [firms, setFirms] = useState([]);

  const showAllFirms = async () => {
    try {
      const token = localStorage.getItem('loginToken');
      if (!token) throw new Error("Token not found");

      const response = await fetch(`${API_URL}/firm/get-AllFirms`, {
        headers: { token }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch firms");
      }

      const data = await response.json();

      if (data.firms?.length > 0) {
        localStorage.setItem('firmId', data.firms[0]._id);
        localStorage.setItem('firmName',data.firms[0].firmName);
      }

      setFirms(data.firms || []);
    } catch (error) {
      console.error("Error occurred while fetching firms:", error);
      alert('Firms fetching failed');
    }
  };
  const handleDeleteFirm = async (firm) => {
  try {
    const token = localStorage.getItem("loginToken");

    // delete products first
    if (firm.product?.length > 0) {
      await Promise.all(
        firm.product.map(async (productId) =>
          await fetch(`${API_URL}/products/delete/${productId}`, {
            method: "DELETE",
            headers: { token:token }
          })
        )
      );
    }

    // delete firm
    const response = await fetch(`${API_URL}/firm/delete/${firm._id}`, {
      method: "DELETE",
      headers: { token:token }
    });

    if (!response.ok) {
      throw new Error("Firm delete failed");
    }
    setFirms(prev => prev.filter(f => f._id !== firm._id));

    console.log("Firm deleted successfully:", firm._id);

  } catch (error) {
    console.error("Error deleting firm:", error);
    alert("Firm deletion failed");
  }
};

  useEffect(() => {
    showAllFirms();
  }, []);

  return (
    <div>
      {firms.length === 0 ? (
        <h2>No firms found</h2>
      ) : (
        <table className="firm-table">
          <thead>
            <tr>
              <th>Firm Name</th>
              <th>Area</th>
              <th>Image</th>
              <th>Products</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {firms.map((firm) => (
              <tr key={firm._id}>
                <td>{firm.firmName}</td>
                <td>{firm.area}</td>
                <td>
                  {firm.image ? (
                    <img
                      src={`${API_URL}/uploads/${firm.image}`}
                      alt={firm.firmName}
                      width="80"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>
                  <button onClick={showProductsHandler}>Get Products</button>
                </td>
                <td>
                  <button onClick={() => handleDeleteFirm(firm)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GetFirms;

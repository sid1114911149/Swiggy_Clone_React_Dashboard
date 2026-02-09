import React, { useState, useEffect } from 'react';
import { API_URL } from '../../data/apiPath';

const GetVendor = () => {
  const [vendor, setVendor] = useState(null);
  const [vendorId, setVendorId] = useState('');

  const handleVendor = async () => {
    try {
      const token = localStorage.getItem('loginToken');
      if (!token) throw new Error("Token not found");

      const payload = JSON.parse(atob(token.split('.')[1]));
      const vendorid = payload.vendorId;

      const response = await fetch(
        `${API_URL}/vendor/get-details/${vendorid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) throw new Error("Failed to fetch vendor");

      const data = await response.json();
      setVendor(data);
      setVendorId(vendorid);

    } catch (error) {
      console.error("Error occurred while fetching Vendor Details:", error);
      alert('Vendor Details fetching failed');
    }
  };

  const handleDeleteFirm = async (firm) => {
    try {
      const token = localStorage.getItem("loginToken");

      if (firm.product?.length > 0) {
        await Promise.all(
          firm.product.map(async (productId) =>
            await fetch(`${API_URL}/products/delete/${productId}`, {
              method: "DELETE",
              headers: { token: token }
            })
          )
        );
      }
      const response = await fetch(`${API_URL}/firm/delete/${firm._id}`, {
        method: "DELETE",
        headers: { token: token }
      });

      if (!response.ok) {
        throw new Error("Firm delete failed");
      }
      // console.log("Firm deleted successfully:", firm._id);

    } catch (error) {
      console.error("Error deleting firm:", error);
      // alert("Firm deletion failed");
    }
  };

  const handleDeleteVendor = async () => {
    try {
      vendor.firm.forEach((firm) => {
        handleDeleteFirm(firm);
      });

      const response = await fetch(
        `${API_URL}/vendor/delete/${vendorId}`,
        {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('loginToken')}`
          }
        }
      );

      if (response.ok) {
        alert('Vendor successfully deleted');
        setVendor(null);
        localStorage.clear();
        window.location.reload();
      } else {
        alert('Error during vendor deletion');
      }
    } catch (error) {
      alert('Vendor not deleted');
    }
  };

  useEffect(() => {
    handleVendor();
  }, []);

  return (
    <div>
      {!vendor ? (
        <p>No Vendor found</p>
      ) : (
        <table className="vendor-table">
          <thead>
            <tr>
              <th>Vendor Name</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{vendor.username}</td>
              <td>{vendor.email}</td>
              <td>
                <button onClick={handleDeleteVendor}>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GetVendor;

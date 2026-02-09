import React, { useState, useEffect } from 'react';
import { API_URL } from '../../data/apiPath';

const GetProductDetails = ({ showProductDetails }) => {
    const [details, setDetails] = useState({});

    const handleDetails = async () => {
        try {
            const product_id = localStorage.getItem('product_id');
            if (!product_id) {
                console.log("product_id not found in localStorage");
                return;
            }

            const response = await fetch(
                `${API_URL}/products/getProduct/${product_id}`,
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                const text = await response.text();
                console.error("Backend error:", text);
                return;
            }

            const data = await response.json();
            console.log("Product data:", data);
            setDetails(data);

        } catch (error) {
            console.error("Network / JS error:", error);
        }
    };

    useEffect(() => {
        if (showProductDetails) {
            handleDetails();
        }
    }, []);

    return (
        <div className='products-section'>
            <table className='product-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Best Seller</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Description</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>{details.productName}</td>
                        <td>{details.price}</td>
                        <td>{details.bestseller ? "Yes" : "No"}</td>
                        <td>
                            {Array.isArray(details.category)
                                ? details.category.map((item, index) => (
                                    <div key={index}>{item}</div>
                                ))
                                : details.category
                                    ? <div>{details.category}</div>
                                    : "—"}

                        </td>

                        <td>
                            {details.image ? (
                                <img
                                    src={`${API_URL}/uploads/${details.image}`}
                                    alt={details.productName}
                                    width="80"
                                />
                            ) : (
                                "No Image"
                            )}
                        </td>

                        <td>{details.description}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default GetProductDetails;

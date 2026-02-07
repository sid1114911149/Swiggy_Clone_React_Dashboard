import React, { useState, useEffect } from 'react';
import { API_URL } from '../../data/apiPath';

const GetProducts = ({productDetailsHandler,showAddProductHandler,showProductDetails}) => {
    const [products, setProducts] = useState([]);

    const showAllProducts = async () => {
        try {
            const firmId = localStorage.getItem('firmId');
            if(!firmId){
                alert(`No Products found for given Firm`)
                return ;
            }
            const response = await fetch(
                `${API_URL}/products/${firmId}/products`,
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const prodData = await response.json();
            // console.log("API Products 👉", prodData);

            setProducts(prodData || []);
            // alert('Products fetched successfully');

        } catch (error) {
            console.error("Error occurred while fetching Products:", error);
            alert('Products fetching failed');
        }
    };
    const createId=(product_id)=>{
        localStorage.setItem('product_id',product_id);
    }
    const removeId=()=>{
        localStorage.removeItem('product_id');
    }
    const handleDelete = async (productId) => {
        try {
            await fetch(`${API_URL}/products/delete/${productId}`, {
                method: "DELETE"
            });

            setProducts(prev =>
                prev.filter(product => product._id !== productId)
            );
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    useEffect(() => {
        showAllProducts();
        if(!showProductDetails){
            removeId();
        }
    }, []);
    return (
        <div className='products-section'>
            <button onClick={showAddProductHandler} className='prod-details'>Add Products</button>
            {products.length === 0 ? (
                <p>No products added</p>
            ) : (
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Details</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((item) => (
                            <tr key={item._id}>
                                <td>{item.productName}</td>
                                <td>₹{item.price}</td>

                                <td>
                                    {item.image ? (
                                        <img
                                            src={`${API_URL}/uploads/${item.image}`}
                                            alt={item.productName}
                                            width="80"
                                        />
                                    ) : (
                                        <span>No Image</span>
                                    )}
                                </td>
                                <td>
                                    <button onClick={()=>{
                                        createId(item._id);
                                        productDetailsHandler();
                                        }}>Show Details</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(item._id)}>
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

export default GetProducts;

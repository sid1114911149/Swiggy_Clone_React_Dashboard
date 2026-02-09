import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath'
const AddProduct = ({showProductsHandler}) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [bestseller, setBestSeller] = useState(false);
  const [description, setDescription] = useState("");
  const [prodImage, setProdImage] = useState(null);
  const handleProdImage = (e) => {
    const Image = e.target.files[0];
    setProdImage(Image);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('loginToken')
      const firmId = localStorage.getItem('firmId');
      if (!loginToken || !firmId) {
        console.log(`User is Not Authenticated`);
      }
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('bestseller', bestseller);
      formData.append('image', prodImage);
      formData.append('description', description);
      const response = await fetch(
        `${API_URL}/products/add-product/${firmId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        setProductName("");
        setPrice("");
        setCategory("");
        setBestSeller(false);
        setDescription("");
        setProdImage(null);
        alert('Product is Created Successfully');
        console.log(data);
      }
      showProductsHandler();
    } catch (error) {
      console.error(error);
      alert(`Product is Not Created `);
    }
  }
  return (
    <div>
      <div className="productSection">
        <form className='tableForm' onSubmit={handleSubmit}>
          <h2>Add Product</h2><br />
          <label>Product Name</label><br />
          <input type="text" name='productName' value={productName} onChange={(e) => setProductName(e.target.value)} /><br />
          <label>Price</label><br />
          <input type="text" name='price' value={price} onChange={(e) => setPrice(e.target.value)} /><br />
          <div className="checkInp">
            <label className="title">Category</label>

            <div className="checkboxContainer">
              <label className="checkboxSection veg">
                <input
                  type="radio"
                  name="category"
                  value="veg"
                  checked={category === "veg"}
                  onChange={(e) => setCategory(e.target.value)}
                />
                Veg
              </label>

              <label className="checkboxSection nonveg">
                <input
                  type="radio"
                  name="category"
                  value="non-veg"
                  checked={category === "non-veg"}
                  onChange={(e) => setCategory(e.target.value)}
                />
                Non-Veg
              </label>
            </div>
          </div>

          <div className="checkInp">
            <label className="title">Best Seller</label>

            <div className="checkboxContainer">
              <label className="checkboxSection veg">
                <input
                  type="radio"
                  name="bestseller"
                  value={true}
                  onChange={(e) => setBestSeller(e.target.value)}
                />
                Yes
              </label>

              <label className="checkboxSection nonveg">
                <input
                  type="radio"
                  name="bestseller"
                  value={false}
                  onChange={(e) => setBestSeller(e.target.value)}
                />
                No
              </label>
            </div>
          </div>
          <label>Description</label><br />
          <input type="text" name='description' value={description} onChange={(e) => setDescription(e.target.value)} /><br />
          <label>Product Image</label><br />
          <input type='file' onChange={handleProdImage} /><br />
          <button type='submit' >Submit</button>
        </form>
      </div>
    </div>
  )
}

export default AddProduct
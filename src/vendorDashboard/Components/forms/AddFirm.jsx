import React, { useState, useRef } from 'react';
import { API_URL } from '../../data/apiPath';

const AddFirm = ({ showFirmsHandler }) => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [firmImage, setFirmImage] = useState(null);

  const fileRef = useRef(null);

  const handleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const handleRegion = (e) => {
    const value = e.target.value;
    setRegion(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const handleImageUploads = (e) => {
    setFirmImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('loginToken');
    if (!token) {
      alert('User not authenticated');
      return;
    }

    if (!firmName || !area || category.length === 0 || region.length === 0) {
      alert('Please fill all required fields');
      return;
    }

    if (!firmImage) {
      alert('Enter a valid firm image');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      category.forEach(val => formData.append('category', val));
      region.forEach(val => formData.append('region', val));
      formData.append('offer', offer);
      formData.append('image', firmImage);

      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: "POST",
        headers,
        body: formData
      });


      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Firm creation failed');
        return;
      }

      setFirmName("");
      setArea("");
      setOffer("");
      setCategory([]);
      setRegion([]);
      setFirmImage(null);
      fileRef.current.value = "";

      localStorage.setItem('firmId', data.firmId);

      alert('Firm Registration Successful');
      showFirmsHandler();

    } catch (error) {
      console.error(error);
      alert('Firm Registration unsuccessful');
    }
  };

  return (
    <div>
      <div className="firmSection">
        <form className='tableForm' onSubmit={handleSubmit}>
          <h2>Add Firm</h2><br />

          <label>Firm Name</label><br />
          <input
            type="text"
            value={firmName}
            placeholder="Enter Firm Name"
            onChange={(e) => setFirmName(e.target.value)}
          /><br />

          <label>Area</label><br />
          <input
            type="text"
            value={area}
            placeholder="Enter Firm Area"
            onChange={(e) => setArea(e.target.value)}
          /><br />

          {/* CATEGORY */}
          <div className="checkInp">
            <label className="title">Category</label>
            <div className="checkboxContainer">
              <label className="checkboxSection veg">
                <input
                  type="checkbox"
                  value="veg"
                  checked={category.includes('veg')}
                  onChange={handleCategory}
                />
                Veg
              </label>

              <label className="checkboxSection nonveg">
                <input
                  type="checkbox"
                  value="non-veg"
                  checked={category.includes('non-veg')}
                  onChange={handleCategory}
                />
                Non-Veg
              </label>
            </div>
          </div>

          {/* REGION */}
          <div className="checkInp">
            <label className="title">Region</label>
            <div className="checkboxContainer">
              <label className="checkboxSection region south">
                <input
                  type="checkbox"
                  value="south-indian"
                  checked={region.includes('south-indian')}
                  onChange={handleRegion}
                />
                South-Indian
              </label>

              <label className="checkboxSection region north">
                <input
                  type="checkbox"
                  value="north-indian"
                  checked={region.includes('north-indian')}
                  onChange={handleRegion}
                />
                North-Indian
              </label>

              <label className="checkboxSection region chinese">
                <input
                  type="checkbox"
                  value="chinese"
                  checked={region.includes('chinese')}
                  onChange={handleRegion}
                />
                Chinese
              </label>

              <label className="checkboxSection region bakery">
                <input
                  type="checkbox"
                  value="bakery"
                  checked={region.includes('bakery')}
                  onChange={handleRegion}
                />
                Bakery
              </label>
            </div>
          </div>

          <label>Offer</label><br />
          <input
            type="text"
            value={offer}
            placeholder="Enter Offer"
            onChange={(e) => setOffer(e.target.value)}
          /><br />

          <label>Firm Image</label><br />
          <input
            type="file"
            ref={fileRef}
            onChange={handleImageUploads}
          /><br />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddFirm;

import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath';
const AddFirm = ({showAddProductHandler}) => {
  const [firmName, setfirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [firmImage, setFirmImage] = useState(null);
  const handleCategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((target) => target !== value))
    } else {
      setCategory([...category, value]);
    }
  }
  const handleRegion = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((e) => e !== value));
    } else {
      setRegion([...region, value]);
    }
  }
  const handleImageUploads=(event)=>{
    const Image=event.target.files[0] // since only one file is retrienved so files[0] is used
    setFirmImage(Image);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('loginToken');
      if (!token) {
        console.error('User not authenticated');
      }
      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      category.forEach((val) => {
        formData.append('category', val);
      })
      region.forEach((val) => {
        formData.append('region', val);
      })
      formData.append('offer', offer);
      formData.append('image',firmImage);
      const response=await fetch(`${API_URL}/firm/add-firm`,{
        method:"POST",
        headers:{
          'token':`${token}`
        },
        body:formData
      })

      const data=await response.json();
      if(response.ok){
        setfirmName("");
        setArea("");
        setOffer("");
        setCategory([]);
        setRegion([]);
        setFirmImage(null);
        localStorage.setItem('firmId',data.firmId);
        console.log(data);

        alert('Firm Registration is Successfull');
        showAddProductHandler();
      }
      // }else if(data.message === "One Vendor Can have Only one firm"){
      //   alert(`Firm Exisits Only one Firm can Added`);
      // }else{
      //   alert('Falied to add Firm');
      // }

    } catch (error) {
      console.error(`Error occured during Firm Registration:${error}`);
      alert('Firm Registration is unSuccessfull');
    }
  }
  return (
    <div>
      <div className="firmSection">
        <form className='tableForm' onSubmit={handleSubmit}>
          <h2>Add Firm</h2><br />
          <label>Firm Name</label><br />
          <input type="text" name='firmName' value={firmName} placeholder='Enter Firm Name:' onChange={(e) => setfirmName(e.target.value)} /><br />
          <label>Area</label><br />
          <input type="text" name='area' value={area} placeholder='Enter Firm Area:' onChange={(e) => setArea(e.target.value)} /><br />
          <div className="checkInp">
            <label className="title">Category</label>

            <div className="checkboxContainer">
              <label className="checkboxSection veg">
                <input type="checkbox" checked={category.includes('veg')} value="veg" onChange={handleCategory} />
                Veg
              </label>

              <label className="checkboxSection nonveg">
                <input type="checkbox" checked={category.includes('non-veg')} value="non-veg" onChange={handleCategory} />
                Non-Veg
              </label>

            </div>
          </div>
          <div className="checkInp">
            <label className="title">Region</label>

            <div className="checkboxContainer">
              <label className="checkboxSection region south">
                <input type="checkbox" checked={region.includes('south-indian')} value="south-indian" onChange={handleRegion} />
                South-Indian
              </label>

              <label className="checkboxSection region north">
                <input type="checkbox" checked={region.includes('north-indian')} value="north-indian" onChange={handleRegion} />
                North-Indian
              </label>

              <label className="checkboxSection region chinese">
                <input type="checkbox" checked={region.includes('chinese')} value="chinese" onChange={handleRegion} />
                Chinese
              </label>

              <label className="checkboxSection region bakery">
                <input type="checkbox" checked={region.includes('bakery')} value="bakery" onChange={handleRegion} />
                Bakery
              </label>
            </div>
          </div>

          <label>Offer</label><br />
          <input type="text" name='offer' value={offer} placeholder='Enter Offer:' onChange={(e) => setOffer(e.target.value)} /><br />
          <label>Firm Image</label><br />
          <input type='file' onChange={handleImageUploads}/><br />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default AddFirm
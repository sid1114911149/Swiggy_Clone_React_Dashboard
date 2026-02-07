import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath';
const Register = ({showLoginHandler}) => {
  const [username,setUserName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: "POST",
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify({username,email,password})
      });
      const data=await response.json();
      if(response.ok){
        console.log(data);
        setEmail("");
        setPassword("");
        setUserName("");
        alert(`Vendor is Registered Successfully`);
        showLoginHandler();
      }
    } catch (error) {
      console.log(`Error Occured during Vendor Registration:${error}`);
      alert(`Registartion Failed`)
    }
  }
  return (
    <div>
      <div className="registerSection">
        <form className="AuthForm" onSubmit={handleSubmit}>
          <h2>Vendor Register</h2>
          <label>UserName:</label><br />
          <input type="text" name='username' value={username} onChange={(e)=>setUserName(e.target.value)} placeholder='Enter UserName' /><br />
          <label>Email:</label><br />
          <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email' /><br />
          <label>Password:</label><br />
          <input type="password" name='password' value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password' /><br />
          <button type="submit" className="submitBtn">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Register
import React ,{useState} from 'react'
import { API_URL } from '../../data/apiPath';
const Login = ({showWelcomeHandler}) => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const response=await fetch(`${API_URL}/vendor/Login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password})
      })
      const data=await response.json();
      if(response.ok){
        setEmail("");
        setPassword("");
        console.log(data);
        localStorage.setItem('loginToken',data.token);
        // localStorage.setItem('firmId',data.firmId);
        alert('Vendor LoggedIn Successfully');
        showWelcomeHandler();
      }
    }catch(error){
      console.log(`Error Occured during Vendor Login:${error}`);
      alert(`Login Failed`)
    }
  }
  return (
    <div>
        <div className="LoginSection">
            <form className='AuthForm' onSubmit={handleSubmit}>
                <h2>Vendor Login</h2>
                <label>Email:</label><br/>
                <input type='text' name='email' value={email}  placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} /><br/>
                <label>Password:</label><br/>
                <input type='password' name='password' value={password} placeholder='Enter Your Password' onChange={(e)=>setPassword(e.target.value)}/><br/>
                <button type="submit" className="submitBtn">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Login
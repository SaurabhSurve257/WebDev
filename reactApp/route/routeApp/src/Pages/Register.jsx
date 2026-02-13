import React from 'react'
import { useNavigate } from 'react-router-dom';

const Register = ({userLoggedIn , setUserLoggedIn}) => {
    const navigate=useNavigate();
    const handleRegister=()=>{
        setUserLoggedIn(!userLoggedIn);
        navigate('/');
    }
  return (
    <div>
        <h1>Register</h1>
        <button onClick={handleRegister}>Register</button>
    </div>
  )
}

export default Register
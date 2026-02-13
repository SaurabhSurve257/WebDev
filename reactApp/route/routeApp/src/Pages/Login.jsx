import React, { useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom';

const Login = ({userLoggedIn}) => {
    const navigate=useNavigate();
    useEffect(() => {
        if(userLoggedIn){
        navigate('/');
        }
    }, [userLoggedIn,navigate])
  return (
    <div>
        <h1>Login</h1>
        <Link to='/register'>Don't have account? Register here</Link>
    </div>
  )
}

export default Login
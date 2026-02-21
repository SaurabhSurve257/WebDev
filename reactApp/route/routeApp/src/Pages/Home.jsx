import { useEffect } from 'react';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Home = ({userLoggedIn}) => {

  const navigate=useNavigate();
  useEffect(()=>{
    if(!userLoggedIn){
      navigate('/Login');
    }
  },[userLoggedIn])
   return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default Home
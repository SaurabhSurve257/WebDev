import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Components/Pages/Login'
import  Header from './Components/Header/Header'
import Navbar from './Components/Navbar/Navbar'



function App() {
  return (
    <>
      <Navbar />
      <Login  />
    </>
  );
}

export default App

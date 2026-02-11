import React , {useState} from 'react'
import './App.css'
import Home from './Pages/Home.jsx';
import About from './pages/about.jsx';
import Contact from './pages/contact.jsx';
import Profile from './pages/profile.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';




function App() {
  const [userLoggedIn, setUserLoggedIn] = useState();
 

  return (
    <>
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
    </div>
      
    </>
  )
}

export default App

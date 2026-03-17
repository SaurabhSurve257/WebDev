import React , {useState} from 'react'
import './App.css'
import Home from './Pages/Home.jsx';
import About from './pages/about.jsx';
import Contact from './pages/contact.jsx';
import Profile from './pages/profile.jsx';
import Setting from './pages/Setting.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';





function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
 

  return (
  
    <>
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home userLoggedIn={userLoggedIn} userRole={userRole} />} />
        <Route path='/login' element={<Login userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} setUserRole={setUserRole} />} />
        <Route path='/register' element={<Register userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        {/* <Route path='/profile' element={<Profile />} /> */}
        <Route path='/Dashboard' element={<Dashboard />} >
        <Route path='profile/: id' element={<Profile />} />
        <Route path='setting' element={<Setting />} />
        </Route> 
      </Routes>
    </BrowserRouter>
    </div>
      
    </>
  )
}

export default App

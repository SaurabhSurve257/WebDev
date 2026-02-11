import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Home from './Pages/Home.jsx';
import About from './pages/about.jsx';
import Contact from './pages/contact.jsx';
import Profile from './pages/profile.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <App />
  
  </StrictMode>

)


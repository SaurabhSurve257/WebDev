import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { useTheme } from './Store/context';


import { ThemeProvider } from './Store/context';


function App() {
 const { theme, toggleTheme } = useTheme();
  return (
    <>
    <div>
      <h1>Current Theme: {theme}</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>

    </div>
    </>
  )
}

export default App

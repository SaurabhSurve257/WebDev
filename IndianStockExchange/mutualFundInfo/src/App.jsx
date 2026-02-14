import { useState } from 'react'
import './App.css'
import Script from './javscript/script'

function App() {
  return (
    <>
      <div className="container">
        <div className="header">
          <h1>📊 Indian Mutual Funds Tracker</h1>
          <p>Find NAV & Details of All Indian Mutual Funds</p>
        </div>

        <div className="search-section">
          <Script />
          <p className="api-info">🔄 Powered by MutualFundsIndia</p>
        </div>
      </div>
    </>
  )
}

export default App

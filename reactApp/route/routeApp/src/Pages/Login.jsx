import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

const Login = ({ userLoggedIn }) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (userLoggedIn) navigate('/')
  }, [userLoggedIn, navigate])

  const validate = () => {
    if (!email || !email.includes('@')) return 'Enter a valid email.'
    if (!password || password.length < 6) return 'Password must be at least 6 characters.'
    return ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const err = validate()
    if (err) return setError(err)
    setError('')
    setLoading(true)
    // Simulate async login (replace with real auth call)
    setTimeout(() => {
      setLoading(false)
      navigate('/')
    }, 700)
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <h1 className="login-title">Welcome Back</h1>
        {error && <div className="login-error">{error}</div>}

        <label className="login-label">
          Email
          <input
            type="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </label>

        <label className="login-label">
          Password
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </label>

        <button className="login-button" type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>

        <div className="login-footer">
          <span>Don't have an account? </span>
          <Link to="/register" className="login-link">
            Register
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
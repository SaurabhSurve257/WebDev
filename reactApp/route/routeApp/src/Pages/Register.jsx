import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'

const Register = ({ userLoggedIn, setUserLoggedIn }) => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) {
      setError('Please fill all required fields')
      return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match')
      return
    }
    setError('')
    setUserLoggedIn(true)
    navigate('/')
  }

  return (
    <div className="register-page">
      <form className="register-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        {error && <div className="error">{error}</div>}

        <label className="field">
          <span>Name</span>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" />
        </label>

        <label className="field">
          <span>Email</span>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
        </label>

        <label className="field">
          <span>Password</span>
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Create a password" />
        </label>

        <label className="field">
          <span>Confirm Password</span>
          <input name="confirm" type="password" value={form.confirm} onChange={handleChange} placeholder="Repeat password" />
        </label>

        <button type="submit" className="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
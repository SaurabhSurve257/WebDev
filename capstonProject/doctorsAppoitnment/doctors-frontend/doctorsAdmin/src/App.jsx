import React from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken')
  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

const DashboardPreview = () => {
  const onLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminEmail')
    window.location.href = '/login'
  }

  return (
    <main className="mx-auto grid min-h-dvh w-full max-w-6xl items-center gap-6 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-blue-200/60 bg-gradient-to-br from-sky-700 via-blue-700 to-cyan-700 p-8 text-white shadow-2xl shadow-blue-900/25 sm:p-10">
        <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-white/15 blur-2xl" />
        <p className="mb-3 inline-flex rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-50">
          Admin Portal
        </p>
        <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
          Dashboard Preview
        </h1>
        <p className="mt-4 max-w-lg text-sm text-cyan-50/95 sm:text-base">
          Login is complete. Next, you can connect this panel to doctors,
          patients, and appointment management tools.
        </p>

        <div className="mt-8 grid gap-3 text-sm">
          <p className="rounded-xl border border-white/25 bg-white/10 px-3 py-2">Token is saved in local storage.</p>
          <p className="rounded-xl border border-white/25 bg-white/10 px-3 py-2">Protected route enabled for admin-only access.</p>
          <p className="rounded-xl border border-white/25 bg-white/10 px-3 py-2">Ready for dashboard widgets and analytics.</p>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur sm:p-8">
        <h2 className="text-3xl font-bold text-slate-900">Session Actions</h2>
        <p className="mt-2 text-sm text-slate-600">
          Use quick links below to continue testing the auth flow.
        </p>

        <div className="mt-5 flex flex-wrap gap-4 text-sm">
          <Link to="/login" className="font-semibold text-teal-700 hover:text-teal-800">
            Go to login page
          </Link>
          <Link to="/signup" className="font-semibold text-teal-700 hover:text-teal-800">
            Go to signup page
          </Link>
        </div>

        <button
          type="button"
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 px-4 py-2.5 font-semibold text-white shadow-lg shadow-blue-700/30 transition hover:from-sky-700 hover:to-blue-700"
          onClick={onLogout}
        >
          Logout Admin
        </button>
      </section>
    </main>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPreview />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
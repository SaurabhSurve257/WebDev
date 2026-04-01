import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllDoctors, getAllPatients, getAllAppointments } from '../api/api'

const Dashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    doctors: 0,
    patients: 0,
    appointments: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('adminToken')
        const email = localStorage.getItem('adminEmail')

        if (!token || !email) {
          navigate('/login')
          return
        }

        const [doctorsData, patientsData, appointmentsData] = await Promise.all([
          getAllDoctors(token),
          getAllPatients(token),
          getAllAppointments(token),
        ])

        setStats({
          doctors: doctorsData.length || 0,
          patients: patientsData.length || 0,
          appointments: appointmentsData.length || 0,
        })
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
        setError('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminEmail')
    localStorage.removeItem('adminId')
    navigate('/login')
  }

  if (loading) {
    return (
      <main className="min-h-dvh bg-slate-50">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-20">
          <p className="text-lg text-slate-600">Loading dashboard...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-dvh bg-slate-50">
      <nav className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-rose-600 px-4 py-2 font-semibold text-white hover:bg-rose-700"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-700">
            {error}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-600">Total Doctors</h2>
            <p className="mt-3 text-3xl font-bold text-blue-600">{stats.doctors}</p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-600">Total Patients</h2>
            <p className="mt-3 text-3xl font-bold text-green-600">{stats.patients}</p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-600">Total Appointments</h2>
            <p className="mt-3 text-3xl font-bold text-purple-600">{stats.appointments}</p>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Welcome to Admin Panel</h2>
          <p className="mt-2 text-slate-600">
            You are logged in as: <strong>{localStorage.getItem('adminEmail')}</strong>
          </p>
        </div>
      </div>
    </main>
  )
}

export default Dashboard
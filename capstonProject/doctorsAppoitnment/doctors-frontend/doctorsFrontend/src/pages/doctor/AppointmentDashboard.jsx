import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const AppointmentDashbaord = () => {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const appointments = useMemo(
    () => [
      {
        id: 'APT-101',
        patientName: 'Aarav Verma',
        age: 29,
        date: '2026-03-20',
        slot: '09:30 AM',
        reason: 'Chest pain and fatigue',
        status: 'Confirmed',
      },
      {
        id: 'APT-102',
        patientName: 'Diya Kapoor',
        age: 34,
        date: '2026-03-20',
        slot: '11:00 AM',
        reason: 'Follow-up consultation',
        status: 'Pending',
      },
      {
        id: 'APT-103',
        patientName: 'Rohan Patel',
        age: 41,
        date: '2026-03-21',
        slot: '01:30 PM',
        reason: 'Skin allergy',
        status: 'Completed',
      },
      {
        id: 'APT-104',
        patientName: 'Meera Joshi',
        age: 26,
        date: '2026-03-21',
        slot: '04:00 PM',
        reason: 'General checkup',
        status: 'Confirmed',
      },
      {
        id: 'APT-105',
        patientName: 'Kabir Singh',
        age: 37,
        date: '2026-03-22',
        slot: '10:30 AM',
        reason: 'Back pain',
        status: 'Pending',
      },
    ],
    []
  )

  const filteredAppointments = appointments.filter((appointment) => {
    const value = search.trim().toLowerCase()
    const searchMatch =
      !value ||
      appointment.patientName.toLowerCase().includes(value) ||
      appointment.id.toLowerCase().includes(value)

    const statusMatch =
      statusFilter === 'all' || appointment.status.toLowerCase() === statusFilter

    return searchMatch && statusMatch
  })

  const stats = {
    total: appointments.length,
    confirmed: appointments.filter((item) => item.status === 'Confirmed').length,
    pending: appointments.filter((item) => item.status === 'Pending').length,
    completed: appointments.filter((item) => item.status === 'Completed').length,
  }

  const getStatusClass = (status) => {
    if (status === 'Confirmed') return 'bg-emerald-100 text-emerald-700'
    if (status === 'Pending') return 'bg-amber-100 text-amber-700'
    return 'bg-slate-200 text-slate-700'
  }

  return (
    <section className="min-h-dvh px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/10 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="mb-2 inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700">
                Doctor Panel
              </p>
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Appointment Dashboard</h1>
              <p className="mt-1 text-slate-600">
                View all appointments booked by patients and track their status.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/doctor/profile"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
              >
                My Profile
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
              >
                Logout
              </Link>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">Total Appointments</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{stats.total}</p>
            </article>
            <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-sm text-emerald-700">Confirmed</p>
              <p className="mt-1 text-2xl font-bold text-emerald-800">{stats.confirmed}</p>
            </article>
            <article className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm text-amber-700">Pending</p>
              <p className="mt-1 text-2xl font-bold text-amber-800">{stats.pending}</p>
            </article>
            <article className="rounded-2xl border border-slate-300 bg-slate-100 p-4">
              <p className="text-sm text-slate-700">Completed</p>
              <p className="mt-1 text-2xl font-bold text-slate-800">{stats.completed}</p>
            </article>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by patient name or appointment id"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none ring-teal-200 transition focus:border-teal-600 focus:ring-4"
            />

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none ring-teal-200 transition focus:border-teal-600 focus:ring-4"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </header>

        <div className="mt-6 grid gap-4">
          {filteredAppointments.map((appointment) => (
            <article
              key={appointment.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{appointment.patientName}</h2>
                  <p className="text-sm text-slate-600">Appointment ID: {appointment.id}</p>
                </div>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(appointment.status)}`}
                >
                  {appointment.status}
                </span>
              </div>

              <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2 lg:grid-cols-4">
                <p>
                  <span className="font-semibold">Age:</span> {appointment.age}
                </p>
                <p>
                  <span className="font-semibold">Date:</span> {appointment.date}
                </p>
                <p>
                  <span className="font-semibold">Time Slot:</span> {appointment.slot}
                </p>
                <p>
                  <span className="font-semibold">Reason:</span> {appointment.reason}
                </p>
              </div>
            </article>
          ))}

          {filteredAppointments.length === 0 && (
            <p className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-slate-600">
              No appointments match your search or status filter.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default AppointmentDashbaord
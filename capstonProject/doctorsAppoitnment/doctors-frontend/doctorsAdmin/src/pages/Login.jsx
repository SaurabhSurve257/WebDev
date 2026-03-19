import React from 'react'
import { Link } from 'react-router-dom'

const highlights = [
  'Track appointments, doctor availability, and patient activity in one dashboard.',
  'Secure admin access for hospitals, clinics, and care coordinators.',
  'Fast visibility into daily operations with a clean and focused workflow.',
]

const Login = () => {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-2xl shadow-cyan-950/30 backdrop-blur sm:grid-cols-2">
        <section className="relative overflow-hidden bg-white px-6 py-8 text-slate-900 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.1),_transparent_30%)]" />

          <div className="relative mx-auto flex h-full max-w-md flex-col justify-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">
                Welcome back
              </p>
              <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                Sign in to your admin account
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Access your clinic operations, manage doctors, and keep
                appointments moving smoothly from one secure place.
              </p>
            </div>

            <form className="mt-8 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Email address
                </span>
                <input
                  type="email"
                  placeholder="admin@hospital.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                />
              </label>

              <label className="block">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-slate-700">
                    Password
                  </span>
                  <button
                    type="button"
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 transition hover:text-cyan-700"
                  >
                    Forgot?
                  </button>
                </div>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                />
              </label>

              <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                  />
                  <span>Remember this device</span>
                </label>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Secure login
                </span>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-cyan-200"
              >
                Sign in
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Need a new account?{' '}
              <Link
                to="/signup"
                className="font-semibold text-cyan-600 transition hover:text-cyan-700"
              >
                Create one
              </Link>
            </p>
          </div>
        </section>

        <section className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-950 via-sky-950 to-cyan-700 p-8 sm:p-10 lg:p-12">
          <div className="absolute inset-0">
            <div className="absolute right-10 top-10 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-10 translate-y-10 rounded-full bg-sky-300/10 blur-3xl" />
          </div>

          <div className="relative">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-50">
              Doctors Appointment
            </span>
            <h2 className="mt-6 max-w-md text-4xl font-bold leading-tight text-white sm:text-5xl">
              Admin control built for fast, reliable care coordination.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-slate-200/85 sm:text-base">
              Stay on top of schedules, patient flow, and team updates with an
              interface designed for busy healthcare operations.
            </p>
          </div>

          <div className="relative mt-10 space-y-4">
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm leading-6 text-slate-100 backdrop-blur-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Login

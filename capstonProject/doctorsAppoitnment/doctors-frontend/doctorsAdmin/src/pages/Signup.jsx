import React from 'react'
import { Link } from 'react-router-dom'

const quickStats = [
  { label: 'Hospitals connected', value: '120+' },
  { label: 'Daily appointments', value: '4.8k' },
  { label: 'Support availability', value: '24/7' },
]

const Signup = () => {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-2xl shadow-cyan-950/30 backdrop-blur sm:grid-cols-2">
        <section className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-cyan-500 via-sky-600 to-slate-900 p-8 sm:p-10 lg:p-12">
          <div className="absolute inset-0">
            <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-white/15 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-56 w-56 translate-x-10 translate-y-10 rounded-full bg-cyan-300/20 blur-3xl" />
          </div>

          <div className="relative">
            <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-50">
              Admin Portal
            </span>
            <h1 className="mt-6 max-w-md text-4xl font-bold leading-tight sm:text-5xl">
              Create your workspace and manage care with confidence.
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-cyan-50/85 sm:text-base">
              Join the doctors appointment platform to organize schedules, monitor
              patients, and keep every admin task in one secure place.
            </p>
          </div>

          <div className="relative mt-10 grid gap-4 sm:grid-cols-3">
            {quickStats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/15 bg-slate-950/20 p-4 backdrop-blur-sm"
              >
                <p className="text-2xl font-bold text-white">{item.value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cyan-100/75">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white px-6 py-8 text-slate-900 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          <div className="mx-auto flex h-full max-w-md flex-col justify-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">
                Sign up
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                Build your admin account
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Add your details below to start managing doctors, patients, and
                appointments from one dashboard.
              </p>
            </div>

            <form className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    First name
                  </span>
                  <input
                    type="text"
                    placeholder="Saurabh"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Last name
                  </span>
                  <input
                    type="text"
                    placeholder="Sharma"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                  />
                </label>
              </div>

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
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Hospital or clinic name
                </span>
                <input
                  type="text"
                  placeholder="Sunrise Care Center"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Password
                  </span>
                  <input
                    type="password"
                    placeholder="Create password"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Confirm password
                  </span>
                  <input
                    type="password"
                    placeholder="Repeat password"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                  />
                </label>
              </div>

              <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                />
                <span>
                  I agree to the terms of service and consent to secure processing
                  of admin account data.
                </span>
              </label>

              <button
                type="submit"
                className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-cyan-200"
              >
                Create admin account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-cyan-600 transition hover:text-cyan-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Signup

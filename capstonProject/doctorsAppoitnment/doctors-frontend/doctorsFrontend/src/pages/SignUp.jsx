import { useState } from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const [role, setRole] = useState('doctor')

  const roleConfig = {
    doctor: {
      title: 'Doctor Sign Up',
      subtitle: 'Create your doctor account to manage schedules and appointments.',
      extraLabel: 'Specialization',
      extraPlaceholder: 'e.g. Cardiologist',
      idLabel: 'Medical Registration Number',
      idPlaceholder: 'Enter medical registration number',
      action: 'Create Doctor Account',
    },
    patient: {
      title: 'Patient Sign Up',
      subtitle: 'Create your patient account to book and track appointments.',
      extraLabel: 'Date of Birth',
      extraPlaceholder: 'YYYY-MM-DD',
      idLabel: 'Patient ID',
      idPlaceholder: 'Create your patient id',
      action: 'Create Patient Account',
    },
  }

  const selected = roleConfig[role]

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <section className="min-h-dvh px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-5xl gap-4 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-900/10 backdrop-blur sm:p-8">
          <p className="mb-3 inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700">
            Doctor Appointment App
          </p>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Create account</h1>
          <p className="mt-4 text-slate-600">
            One signup flow for doctors and patients with role-specific details.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-teal-600" />
              Doctor and patient onboarding
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-teal-600" />
              Minimal and secure form design
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-teal-600" />
              Easy switch between account types
            </li>
          </ul>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/10 sm:p-8">
          <div className="mb-5 grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setRole('doctor')}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                role === 'doctor'
                  ? 'bg-white text-slate-900 shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Doctor Sign Up
            </button>
            <button
              type="button"
              onClick={() => setRole('patient')}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                role === 'patient'
                  ? 'bg-white text-slate-900 shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Patient Sign Up
            </button>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">{selected.title}</h2>
          <p className="mt-1 text-sm text-slate-600">{selected.subtitle}</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none ring-teal-200 transition focus:border-teal-600 focus:ring-4"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none ring-teal-200 transition focus:border-teal-600 focus:ring-4"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="roleId" className="mb-1 block text-sm font-medium text-slate-700">
                  {selected.idLabel}
                </label>
                <input
                  id="roleId"
                  type="text"
                  placeholder={selected.idPlaceholder}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none ring-teal-200 transition focus:border-teal-600 focus:ring-4"
                  required
                />
              </div>

              <div>
                <label htmlFor="extraField" className="mb-1 block text-sm font-medium text-slate-700">
                  {selected.extraLabel}
                </label>
                <input
                  id="extraField"
                  type={role === 'patient' ? 'date' : 'text'}
                  placeholder={selected.extraPlaceholder}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none ring-teal-200 transition focus:border-teal-600 focus:ring-4"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Create password"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none ring-teal-200 transition focus:border-teal-600 focus:ring-4"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-slate-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none ring-teal-200 transition focus:border-teal-600 focus:ring-4"
                  required
                />
              </div>
            </div>

            <label className="inline-flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" className="h-4 w-4 accent-teal-600" required />
              I agree to terms and privacy policy
            </label>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 px-4 py-2.5 font-semibold text-white shadow-lg shadow-teal-700/25 transition hover:from-teal-700 hover:to-teal-800"
            >
              {selected.action}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-teal-700 hover:text-teal-800">
              Login here
            </Link>
          </p>
        </article>
      </div>
    </section>
  )
}

export default SignUp
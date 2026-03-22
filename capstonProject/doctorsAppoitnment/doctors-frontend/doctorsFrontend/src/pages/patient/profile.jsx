import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getStoredSession } from '../../api/auth'
import { getPatientById, updatePatient } from '../../api/patientsApi'

const emptyProfile = {
  name: '',
  email: '',
  age: '',
  contactNumber: '',
  address: '',
}

const mapPatientToForm = (patient) => ({
  name: patient?.name || '',
  email: patient?.email || '',
  age: patient?.age !== undefined && patient?.age !== null ? String(patient.age) : '',
  contactNumber: patient?.contactNumber || '',
  address: patient?.address || '',
})

const Profile = () => {
  const [formData, setFormData] = useState(emptyProfile)
  const [initialProfile, setInitialProfile] = useState(emptyProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    let isMounted = true

    const fetchPatientProfile = async () => {
      setIsLoading(true)
      setError('')

      try {
        const { token, patientId } = getStoredSession()

        if (!token || !patientId) {
          throw new Error('Patient session not found. Please login again.')
        }

        const patient = await getPatientById(patientId, token)
        const mappedProfile = mapPatientToForm(patient)

        if (isMounted) {
          setFormData(mappedProfile)
          setInitialProfile(mappedProfile)
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message || 'Failed to load patient profile.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchPatientProfile()

    return () => {
      isMounted = false
    }
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  const handleSave = async (event) => {
    event.preventDefault()
    setStatusMessage('')
    setError('')

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.contactNumber.trim() ||
      !formData.address.trim()
    ) {
      setError('Name, email, contact number, and address are required.')
      return
    }

    const ageValue = Number(formData.age)
    if (Number.isNaN(ageValue) || ageValue <= 0) {
      setError('Age must be a positive number.')
      return
    }

    try {
      setIsSaving(true)
      const { token, patientId } = getStoredSession()

      if (!token || !patientId) {
        throw new Error('Patient session not found. Please login again.')
      }

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        age: ageValue,
        contactNumber: formData.contactNumber.trim(),
        address: formData.address.trim(),
      }

      const response = await updatePatient(patientId, payload, token)
      const updatedPatient = response?.patient || payload
      const mappedProfile = mapPatientToForm(updatedPatient)

      setFormData(mappedProfile)
      setInitialProfile(mappedProfile)
      setIsEditing(false)
      setStatusMessage(response?.message || 'Profile updated successfully.')
    } catch (requestError) {
      setError(requestError.message || 'Failed to update profile.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setFormData(initialProfile)
    setIsEditing(false)
    setError('')
    setStatusMessage('Changes discarded.')
  }

  return (
    <section className="min-h-dvh px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/10 sm:p-8">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="mb-2 inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700">
              Patient Profile
            </p>
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">My Details</h1>
            <p className="mt-1 text-slate-600">View and edit your personal profile information.</p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/patient/doctors"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
            >
              Back to Doctors
            </Link>
            {!isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(true)
                  setStatusMessage('')
                }}
                className="rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 px-4 py-2 font-semibold text-white shadow-lg shadow-teal-700/25 transition hover:from-teal-700 hover:to-teal-800"
              >
                Edit Profile
              </button>
            )}
          </div>
        </header>

        {statusMessage && (
          <div className="mb-4 rounded-xl border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-800">
            {statusMessage}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-800">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-slate-600">
            Loading patient profile...
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none ring-teal-200 transition disabled:bg-slate-100 disabled:text-slate-500 focus:border-teal-600 focus:ring-4"
                  required
                />
              </div>

              <div>
                <label htmlFor="age" className="mb-1 block text-sm font-medium text-slate-700">
                  Age
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  min="1"
                  value={formData.age}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none ring-teal-200 transition disabled:bg-slate-100 disabled:text-slate-500 focus:border-teal-600 focus:ring-4"
                  required
                />
              </div>

              <div>
                <label htmlFor="contactNumber" className="mb-1 block text-sm font-medium text-slate-700">
                  Phone Number
                </label>
                <input
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none ring-teal-200 transition disabled:bg-slate-100 disabled:text-slate-500 focus:border-teal-600 focus:ring-4"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none ring-teal-200 transition disabled:bg-slate-100 disabled:text-slate-500 focus:border-teal-600 focus:ring-4"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="mb-1 block text-sm font-medium text-slate-700">
                Address
              </label>
              <input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none ring-teal-200 transition disabled:bg-slate-100 disabled:text-slate-500 focus:border-teal-600 focus:ring-4"
                required
              />
            </div>

            {isEditing && (
              <div className="flex flex-wrap justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 px-4 py-2 font-semibold text-white shadow-lg shadow-teal-700/25 transition hover:from-teal-700 hover:to-teal-800"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  )
}

export default Profile

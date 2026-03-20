import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const DoctorProfile = () => {
	const initialProfile = useMemo(
		() => ({
			fullName: 'Dr. Aanya Sharma',
			age: '38',
			specialization: 'Cardiologist',
			experience: '12',
			qualification: 'MD - Cardiology',
			hospital: 'City Care Multispeciality Hospital',
			phone: '+91 98765 43210',
			email: 'dr.aanya@caremail.com',
			consultationFee: '900',
			availableFrom: '09:00',
			availableTo: '17:00',
			bio: 'Focused on preventive cardiology and long-term heart wellness plans.',
		}),
		[]
	)

	const [formData, setFormData] = useState(initialProfile)
	const [isEditing, setIsEditing] = useState(false)
	const [statusMessage, setStatusMessage] = useState('')

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormData((previous) => ({ ...previous, [name]: value }))
	}

	const handleSave = (event) => {
		event.preventDefault()
		setIsEditing(false)
		setStatusMessage('Profile updated successfully.')
	}

	const handleCancel = () => {
		setFormData(initialProfile)
		setIsEditing(false)
		setStatusMessage('Changes discarded.')
	}

	return (
		<section className="min-h-dvh px-4 py-8 sm:px-6 lg:px-8">
			<div className="mx-auto w-full max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/10 sm:p-8">
				<header className="mb-6 flex flex-wrap items-center justify-between gap-3">
					<div>
						<p className="mb-2 inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700">
							Doctor Profile
						</p>
						<h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">My Details</h1>
						<p className="mt-1 text-slate-600">View and update your professional details.</p>
					</div>

					<div className="flex items-center gap-2">
						<Link
							to="/doctor/appointments"
							className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
						>
							Back to Dashboard
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

				<form onSubmit={handleSave} className="space-y-5">
					<div className="grid gap-4 sm:grid-cols-2">
						<div>
							<label htmlFor="fullName" className="mb-1 block text-sm font-medium text-slate-700">
								Full Name
							</label>
							<input
								id="fullName"
								name="fullName"
								value={formData.fullName}
								onChange={handleChange}
								disabled={!isEditing}
								className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none ring-teal-200 transition disabled:bg-slate-100 disabled:text-slate-500 focus:border-teal-600 focus:ring-4"
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
								min="0"
								value={formData.age}
								onChange={handleChange}
								disabled={!isEditing}
								className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none ring-teal-200 transition disabled:bg-slate-100 disabled:text-slate-500 focus:border-teal-600 focus:ring-4"
							/>
						</div>

						<div>
							<label htmlFor="specialization" className="mb-1 block text-sm font-medium text-slate-700">
								Specialization
							</label>
							<input
								id="specialization"
								name="specialization"
								value={formData.specialization}
								onChange={handleChange}
								disabled={!isEditing}
								className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none ring-teal-200 transition disabled:bg-slate-100 disabled:text-slate-500 focus:border-teal-600 focus:ring-4"
							/>
						</div>

						<div>
							<label htmlFor="experience" className="mb-1 block text-sm font-medium text-slate-700">
								Experience (years)
							</label>
							<input
								id="experience"
								name="experience"
								type="number"
								min="0"
								value={formData.experience}
								onChange={handleChange}
								disabled={!isEditing}
								className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none ring-teal-200 transition disabled:bg-slate-100 disabled:text-slate-500 focus:border-teal-600 focus:ring-4"
							/>
						</div>

						<div>
							<label htmlFor="qualification" className="mb-1 block text-sm font-medium text-slate-700">
								Qualification
							</label>
							<input
								id="qualification"
								name="qualification"
								value={formData.qualification}
								onChange={handleChange}
								disabled={!isEditing}
								className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none ring-teal-200 transition disabled:bg-slate-100 disabled:text-slate-500 focus:border-teal-600 focus:ring-4"
							/>
						</div>

						<div>
							<label htmlFor="hospital" className="mb-1 block text-sm font-medium text-slate-700">
								Hospital / Clinic
							</label>
							<input
								id="hospital"
								name="hospital"
								value={formData.hospital}
								onChange={handleChange}
								disabled={!isEditing}
								className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none ring-teal-200 transition disabled:bg-slate-100 disabled:text-slate-500 focus:border-teal-600 focus:ring-4"
							/>
						</div>

						<div>
							<label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">
								Phone Number
							</label>
							<input
								id="phone"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								disabled={!isEditing}
								className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none ring-teal-200 transition disabled:bg-slate-100 disabled:text-slate-500 focus:border-teal-600 focus:ring-4"
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
							/>
						</div>

						<div>
							<label htmlFor="consultationFee" className="mb-1 block text-sm font-medium text-slate-700">
								Consultation Fee
							</label>
							<input
								id="consultationFee"
								name="consultationFee"
								type="number"
								min="0"
								value={formData.consultationFee}
								onChange={handleChange}
								disabled={!isEditing}
								className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none ring-teal-200 transition disabled:bg-slate-100 disabled:text-slate-500 focus:border-teal-600 focus:ring-4"
							/>
						</div>

						<div className="grid gap-3 grid-cols-2">
							<div>
								<label htmlFor="availableFrom" className="mb-1 block text-sm font-medium text-slate-700">
									Available From
								</label>
								<input
									id="availableFrom"
									name="availableFrom"
									type="time"
									value={formData.availableFrom}
									onChange={handleChange}
									disabled={!isEditing}
									className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none ring-teal-200 transition disabled:bg-slate-100 disabled:text-slate-500 focus:border-teal-600 focus:ring-4"
								/>
							</div>
							<div>
								<label htmlFor="availableTo" className="mb-1 block text-sm font-medium text-slate-700">
									Available To
								</label>
								<input
									id="availableTo"
									name="availableTo"
									type="time"
									value={formData.availableTo}
									onChange={handleChange}
									disabled={!isEditing}
									className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none ring-teal-200 transition disabled:bg-slate-100 disabled:text-slate-500 focus:border-teal-600 focus:ring-4"
								/>
							</div>
						</div>
					</div>

					<div>
						<label htmlFor="bio" className="mb-1 block text-sm font-medium text-slate-700">
							Professional Bio
						</label>
						<textarea
							id="bio"
							name="bio"
							rows={4}
							value={formData.bio}
							onChange={handleChange}
							disabled={!isEditing}
							className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-800 outline-none ring-teal-200 transition disabled:bg-slate-100 disabled:text-slate-500 focus:border-teal-600 focus:ring-4"
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
								className="rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 px-4 py-2 font-semibold text-white shadow-lg shadow-teal-700/25 transition hover:from-teal-700 hover:to-teal-800"
							>
								Save Changes
							</button>
						</div>
					)}
				</form>
			</div>
		</section>
	)
}

export default DoctorProfile
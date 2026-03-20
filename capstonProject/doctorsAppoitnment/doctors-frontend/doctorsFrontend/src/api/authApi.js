const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

const TOKEN_STORAGE_KEYS = {
	admin: 'adminToken',
	doctor: 'doctorToken',
	patient: 'patientToken',
}

const buildHeaders = () => ({
	'Content-Type': 'application/json',
})

const request = async (endpoint, { method = 'GET', body } = {}) => {
	const response = await fetch(`${API_BASE_URL}${endpoint}`, {
		method,
		headers: buildHeaders(),
		body: body !== undefined ? JSON.stringify(body) : undefined,
	})

	const payload = await response.json().catch(() => ({}))

	if (!response.ok) {
		const message = payload.message || `Request failed with status ${response.status}`
		const error = new Error(message)
		error.status = response.status
		error.payload = payload
		throw error
	}

	return payload
}

export const getTokenStorageKey = (role) => TOKEN_STORAGE_KEYS[role] || 'token'

export const storeAuthToken = (role, token) => {
	if (!token) {
		return
	}

	localStorage.setItem(getTokenStorageKey(role), token)
	localStorage.setItem('token', token)
}

export const getStoredToken = (role) => {
	if (role) {
		return localStorage.getItem(getTokenStorageKey(role))
	}

	return (
		localStorage.getItem('adminToken') ||
		localStorage.getItem('doctorToken') ||
		localStorage.getItem('patientToken') ||
		localStorage.getItem('token')
	)
}

export const clearAuthTokens = () => {
	localStorage.removeItem('adminToken')
	localStorage.removeItem('doctorToken')
	localStorage.removeItem('patientToken')
	localStorage.removeItem('token')
}

export const registerUser = (userData) =>
	request('/auth/register', {
		method: 'POST',
		body: userData,
	})

export const registerPatient = ({
	name,
	email,
	age,
	contactNumber,
	password,
	address,
}) =>
	registerUser({
		name,
		email,
		age,
		contactNumber,
		password,
		address,
		role: 'patient',
	})

export const registerDoctor = ({
	name,
	email,
	age,
	contactNumber,
	password,
	address,
	specialization,
	experience,
}) =>
	registerUser({
		name,
		email,
		age,
		contactNumber,
		password,
		address,
		specialization,
		experience,
		role: 'doctor',
	})

export const loginUser = async ({ email, password, role }) => {
	const payload = await request('/auth/login', {
		method: 'POST',
		body: {
			email,
			password,
			role,
		},
	})

	if (payload.token) {
		storeAuthToken(role, payload.token)
	}

	return payload
}

export const loginPatient = (credentials) =>
	loginUser({
		...credentials,
		role: 'patient',
	})

export const loginDoctor = (credentials) =>
	loginUser({
		...credentials,
		role: 'doctor',
	})

const authApi = {
	registerUser,
	registerPatient,
	registerDoctor,
	loginUser,
	loginPatient,
	loginDoctor,
	getTokenStorageKey,
	storeAuthToken,
	getStoredToken,
	clearAuthTokens,
}

export default authApi

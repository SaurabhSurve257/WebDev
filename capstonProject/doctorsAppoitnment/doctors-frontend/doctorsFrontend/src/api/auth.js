import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

const authClient = axios.create({
	baseURL: `${API_BASE_URL}/auth`,
	headers: {
		'Content-Type': 'application/json',
	},
})

export const loginUser = async ({ email, password, role }) => {
	const response = await authClient.post('/login', {
		email,
		password,
		role,
	})

	return response.data
}

export const registerUser = async (payload) => {
	const response = await authClient.post('/register', payload)
	return response.data
}

export const decodeTokenPayload = (token) => {
	if (!token || !token.includes('.')) return null

	try {
		const base64Payload = token.split('.')[1]
		const normalizedPayload = base64Payload.replace(/-/g, '+').replace(/_/g, '/')
		const payloadText = window.atob(normalizedPayload)
		return JSON.parse(payloadText)
	} catch {
		return null
	}
}

export const persistAuthSession = ({ token, role, email, userId, doctorId, patientId, adminId }) => {
	if (!token) return

	const decodedPayload = decodeTokenPayload(token)
	const resolvedUserId = userId || decodedPayload?.id || null
	const resolvedRole = role || decodedPayload?.role || null

	localStorage.setItem('token', token)
	if (resolvedRole) {
		localStorage.setItem(`${resolvedRole}Token`, token)
		localStorage.setItem('userRole', resolvedRole)
	}
	if (email) {
		localStorage.setItem('userEmail', email)
	}

	if (resolvedUserId) {
		localStorage.setItem('userId', resolvedUserId)
	}

	if (doctorId || resolvedRole === 'doctor') {
		localStorage.setItem('doctorId', doctorId || resolvedUserId)
	}

	if (patientId || resolvedRole === 'patient') {
		localStorage.setItem('patientId', patientId || resolvedUserId)
	}

	if (adminId) {
		localStorage.setItem('adminId', adminId)
	}
}

export const clearAuthSession = () => {
	const keys = [
		'token',
		'adminToken',
		'doctorToken',
		'patientToken',
		'userRole',
		'userEmail',
		'userId',
		'doctorId',
		'patientId',
		'adminId',
	]

	keys.forEach((key) => localStorage.removeItem(key))
}

export const getStoredSession = () => {
	const role = localStorage.getItem('userRole')
	const token =
		localStorage.getItem(`${role}Token`) ||
		localStorage.getItem('token') ||
		localStorage.getItem('doctorToken') ||
		localStorage.getItem('patientToken') ||
		localStorage.getItem('adminToken')

	return {
		role,
		token,
		userId: localStorage.getItem('userId'),
		doctorId: localStorage.getItem('doctorId'),
		patientId: localStorage.getItem('patientId'),
		email: localStorage.getItem('userEmail'),
	}
}

const authApi = {
	loginUser,
	registerUser,
	persistAuthSession,
	decodeTokenPayload,
	clearAuthSession,
	getStoredSession,
}

export default authApi

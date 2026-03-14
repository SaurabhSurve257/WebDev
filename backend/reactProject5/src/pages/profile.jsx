import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import { getUserProfile, getallUsers } from '../api/userApi'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [allUsers, setAllUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        navigate('/profile')
        return
      }

      try {
        const userData = await getUserProfile(token)
        setUser(userData)

        // If admin, fetch all users
        if (userData.role === 'admin') {
          const usersData = await getallUsers(token)
          setAllUsers(usersData)
        }
      } catch (error) {
        console.error('Profile fetch error:', error)
        setError('Failed to load profile. Please try logging in again.')
        // If token is invalid, redirect to login
        if (error.response?.status === 401) {
          localStorage.removeItem('token')
          navigate('/login')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserProfile()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <Card className="p-8 max-w-md w-full text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-light text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => navigate('/login')} variant="primary">
            Go to Login
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-xl font-light text-gray-900">
              {user?.role === 'admin' ? 'Admin Dashboard' : 'Access Denied'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {user?.role === 'admin' ? 'All users data' : 'You do not have access to this page'}
            </p>
          </div>

          {user?.role === 'admin' ? (
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-medium text-gray-900">All Users</h3>
              {allUsers.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {allUsers.map((u) => (
                    <div key={u._id} className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Name
                          </label>
                          <p className="mt-1 text-sm text-gray-900">{u.name || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Email
                          </label>
                          <p className="mt-1 text-sm text-gray-900">{u.email || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Role
                          </label>
                          <p className="mt-1 text-sm text-gray-900">{u.role || 'user'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No users found.</p>
              )}
            </div>
          ) : (
            <div className="text-center mb-8">
              <p className="text-red-600 text-lg">You don't have access to view this data.</p>
            </div>
          )}

          <Button onClick={handleLogout} variant="secondary" className="w-full">
            Logout
          </Button>
        </Card>
      </div>
    </div>
  )
}

export default Profile
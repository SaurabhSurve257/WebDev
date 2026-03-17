import { useEffect, useState } from 'react';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getallUsers } from '../api/userApi';

const Home = ({userLoggedIn, userRole}) => {

  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoggedIn) {
      navigate('/login');
    } else if (userRole === 'admin') {
      fetchAllUsers();
    }
  }, [userLoggedIn, userRole]);

  const fetchAllUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    setIsLoading(true);
    try {
      const users = await getallUsers(token);
      setAllUsers(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      {userRole === 'admin' && (
        <div>
          <h2>All Users Data</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {allUsers.map(user => (
                <li key={user._id}>
                  {user.name} - {user.email} - {user.role}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {userRole === 'user' && <p>You don't have access to view data.</p>}
    </div>
  )
}

export default Home
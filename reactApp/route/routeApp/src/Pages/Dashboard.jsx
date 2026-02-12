import React from 'react'
import { Outlet } from 'react-router-dom';

import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
        <h1>Dashboard</h1>
        <Link to='/Dashboard/profile/: id'>Go To Profile</Link>
        <Link to='/Dashboard/setting'>Go To Settings</Link>
     <Outlet />
    </div>
    
  )
}

export default Dashboard
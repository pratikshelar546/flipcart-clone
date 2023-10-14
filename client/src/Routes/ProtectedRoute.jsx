import React from 'react'
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({isAdmin, children}) => {
    // console.log(children);
    const admin = JSON.parse(localStorage.getItem("AdminDetail"))
    console.log(admin);
  return (
    <>
    {admin?.fullName? children: <Navigate to="/admin/login"/> }
    </>
  )
}

export default ProtectedRoute
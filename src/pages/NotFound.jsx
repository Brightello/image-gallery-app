import { useAuth } from "@context/auth.jsx"
import React from "react"
import { Navigate } from "react-router-dom"

function NotFound() {
  const { currentUser } = useAuth()

  return (
    <>{currentUser ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}</>
  )
}

export default NotFound

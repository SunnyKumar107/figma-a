import React, { useContext, useEffect } from 'react'
import Clock from './clock'
import { userContext } from '../context/context'
import { useNavigate } from 'react-router-dom'

export default function TrackingScreen() {
  const { user } = useContext(userContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/sign-in')
    }
  }, [])

  return (
    <div className="w-full min-h-screen flex justify-center p-6">
      <Clock />
    </div>
  )
}

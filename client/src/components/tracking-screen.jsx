import React, { useContext, useEffect, useState } from 'react'
import Clock from './clock'
import { userContext } from '../context/context'
import { useNavigate } from 'react-router-dom'

export default function TrackingScreen() {
  let currentTime = new Date()

  const [speed, setSpeed] = useState(1)
  const { user } = useContext(userContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/sign-in')
    }
  }, [])

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-6 bg-[#ffffff]">
      <Clock currentTime={currentTime} speed={speed} />
      <div className="my-6 flex flex-col items-center gap-4">
        <h1 className="text-3xl font-semibold text-[#878787]">{speed}</h1>
        <input
          name="slider"
          type="range"
          id="slider"
          min={1}
          max={10}
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          className="accent-[#FE8C00] w-56 rounded-lg cursor-pointer"
        />
        <p className="text-[#878787] text-sm font-medium ">Control Speed</p>
      </div>
    </div>
  )
}

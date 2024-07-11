import React, { useContext } from 'react'
import { userContext } from '../context/context'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { user, setUser } = useContext(userContext)
  const navigate = useNavigate()

  if (!user) {
    navigate('/sign-in')
    return
  }

  const handleLogout = async () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    googleLogout()
    navigate('/sign-in')
  }

  return (
    <div className="flex flex-col gap-1 items-center">
      <div>
        <h1 className="text-4xl font-medium">{user.name}</h1>
        <p className="text-sm text-gray-500 mt-2">{user.email}</p>
      </div>
      <button
        className="mt-4 bg-slate-900 text-white rounded-lg p-2"
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  )
}

export default Home

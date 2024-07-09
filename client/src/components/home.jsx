import { useContext, useEffect } from 'react'
import { userContext } from '../context/context'
import { useNavigate } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google'

export default function Home() {
  const { user, setUser } = useContext(userContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/sign-in')
    }
  }, [])

  const handleLogout = async () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    googleLogout()
    navigate('/sign-in')
  }

  if (!user) return null

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

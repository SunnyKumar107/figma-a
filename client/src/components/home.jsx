import { useContext, useEffect } from 'react'
import { userContext } from '../context/context'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const { user } = useContext(userContext)
  const navigate = useNavigate()

  console.log('home', user)
  useEffect(() => {
    if (!user) {
      navigate('/sign-in')
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
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
        Logout
      </button>
    </div>
  )
}

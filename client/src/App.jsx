import { Routes, Route, useNavigate } from 'react-router-dom'
import LoginPage from './components/login-page'
import { userContext } from './context/context'
import { useEffect, useState } from 'react'
import Register from './components/register-page'
import Home from './components/home'
import TrackingScreen from './components/tracking-screen'

export default function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('loggedUser')
    if (user) {
      const loginUser = JSON.parse(user)
      setUser(loginUser)
    } else {
      navigate('/sign-in')
    }
  }, [])

  return (
    <>
      <userContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tracking-screen" Component={TrackingScreen} />
        </Routes>
      </userContext.Provider>
    </>
  )
}

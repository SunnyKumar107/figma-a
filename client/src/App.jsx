import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/login-page'
import { userContext } from './context/context'
import { useEffect, useState } from 'react'
import Register from './components/register-page'
import usersService from './services/users'
import Home from './components/home'

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem('loggedUser')
    if (user) {
      const loginUser = JSON.parse(user)
      setUser(loginUser)
      usersService.setToken(loginUser.token)
    }
  }, [])

  return (
    <Router>
      <userContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </userContext.Provider>
    </Router>
  )
}

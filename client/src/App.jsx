import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/login-page'
import Home from './components/home'
import { userContext } from './context/context'
import { useEffect, useState } from 'react'

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem('loggedUser')
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  return (
    <Router>
      <userContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </userContext.Provider>
    </Router>
  )
}

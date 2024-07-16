import { useContext } from 'react'
import { userContext } from '../context/context'
import { NavLink, useNavigate } from 'react-router-dom'

const Home = () => {
  const { setUser } = useContext(userContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    navigate('/sign-in')
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex flex-col gap-1 items-center"
      style={{
        backgroundImage: 'url(/image_39.png)'
      }}
    >
      <div className="w-full flex flex-col items-center sm:max-w-[600px] h-[492px] rounded-t-3xl absolute bottom-0 bg-[#ffffff] px-6 pb-6">
        <div className="flex justify-center items-center h-6 p-2">
          <div className="w-[58.13px] h-[4px] bg-[#878787] rounded-[11px]"></div>
        </div>
        <div className="flex flex-col items-center justify-center mt-8">
          <img
            src="/Illustration_Success.png"
            alt="success"
            className="w-[202.62px] h-[168px]"
          />
          <h1 className="text-[#101010] font-semibold text-2xl mt-8 font-inter text-center">
            Login Successful
          </h1>
        </div>
        <NavLink
          to="/tracking-screen"
          className="bg-[#FE8C00] mt-8 w-full text-center text-white rounded-[100px] p-4 text-sm font-semibold hover:bg-[#FE8C00]/80 h-[52px]"
        >
          Go to Tracking Screen
        </NavLink>
        <button
          className="text-sm font-medium font-inter text-center text-[#878787] hover:text-[#878787]/80 mt-[22px]"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Home

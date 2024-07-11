import React, { useContext, useEffect } from 'react'
import { userContext } from '../context/context'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'

const Home = () => {
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
    navigate('/sign-in')
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat flex flex-col gap-1 items-center"
      style={{
        backgroundImage:
          'url(https://s3-alpha-sig.figma.com/img/e088/8995/13a478aa6d3cc9bebac1c6fe29b1cf35?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=duz6dA7doe3wpqGBTvFXD7eSqCD1lBv39rMRvpbxVxWU-HwqrRREYNRE9el2I7LQ0kPjAVZa9CdyOW-EhrkuDHLn0Qw-X5F~mxs7hKcbyrgiXQbv6IbgDiAy8Eze4ErKeBRmZhXOjIUdhSN5SRgZaip8TlZe3--BCk-4yKi2c88lC~V73tXAVaV5xowjy6WYbeO5g-NSXxbY9PGnPx-t1pcidgKfTY-DojLcSVzrByxyw7gfGL5tdI0BsKbc12Ynu8MW4rnc-Ctmc0S3TE7ICdWL22FaTsKhQT0h7N6Nkd5SF6y8M7Lmp8fwbnH8AAPVWa0AtlqcLFrnTJg8ExaFVw__)'
      }}
    >
      <div className="w-full flex flex-col items-center sm:max-w-[600px] h-[492px] rounded-t-3xl absolute bottom-0 bg-[#ffffff] px-6 pb-6">
        <div className="flex justify-center p-2">
          <div className="w-[58.13px] h-[4px] bg-[#878787] rounded-[11px]"></div>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 p-10 mt-6">
          <div className="w-24 h-24 flex items-center justify-center rounded-full border-dotted border-8 border-[#FE8C00] text-[#FE8C00]">
            <FaCheck size={35} />
          </div>
          <h1 className="text-[#101010] font-semibold text-2xl">
            Login Successful
          </h1>
        </div>
        <NavLink
          to="/tracking-screen"
          className="bg-[#FE8C00] w-full text-center text-white rounded-[100px] p-4 text-sm font-semibold hover:bg-[#FE8C00]/80 h-[52px]"
        >
          Go to Tracking Screen
        </NavLink>
        <button
          className="text-sm font-semibold text-[#878787] hover:text-[#878787]/80 mt-4"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Home

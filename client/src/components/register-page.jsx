import { GoogleLogin } from '@react-oauth/google'
import React, { useContext, useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { LuLoader2 } from 'react-icons/lu'
import { NavLink, useNavigate } from 'react-router-dom'
import usersService from '../services/users'
import { userContext } from '../context/context'
import { RiErrorWarningLine } from 'react-icons/ri'
import { jwtDecode } from 'jwt-decode'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(null)
  const { user, setUser } = useContext(userContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])

  const showError = (msg) => {
    setError(msg)
    setTimeout(() => {
      setError(null)
    }, 3000)
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    const email = e.target.email.value
    const name = e.target.name.value
    const password = e.target.password.value

    setPending(true)
    const res = await usersService.register({ email, name, password })
    setPending(false)

    if (res.success) {
      setUser(res.user)
      usersService.setToken(res.user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(res.user))
      navigate('/')
      return
    }

    showError(res.error)
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-2 bg-[#F9FAFB] font-inter">
      <div className="w-[375px] p-6 bg-[#FFFFFF] rounded-lg shadow">
        <div className="text-left">
          <h1 className="text-[32px] font-[600] leading-[40px] font-inter text-[#101010]">
            Create your new account.
          </h1>
          <p className="text-[14px] font-medium leading-[20px] font-sans text-[#878787] mt-2">
            Create an account to start looking for the food you like
          </p>
        </div>
        <form onSubmit={handleRegister} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-[#101010] text-sm font-inter font-[500] leading-[20px]"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              className="border-[1px] border-[#D6D6D6] rounded-lg p-4 text-sm font-medium leading-[20px] text-[#101010]"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-[#101010] text-sm font-inter font-[500] leading-[20px]"
            >
              User Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              placeholder="Enter Name"
              className="border-[1px] border-[#D6D6D6] rounded-lg p-4 text-sm font-medium leading-[20px] text-[#101010]"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-[#101010] text-sm font-inter font-[500] leading-[20px]"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Password"
                className="w-full border-[1px] border-[#D6D6D6] rounded-lg p-4 text-sm font-medium leading-[20px] text-[#101010]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[17px] text-[#101010] hover:text-[#101010]/80"
              >
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>
          </div>
          <div className="mb-2 flex">
            <div className="">
              <input
                type="checkbox"
                className="accent-[#FE8C00] h-[20px] w-[20px] rounded mr-2"
                required
              />
            </div>
            <p className="text-sm font-medium text-slate-700">
              I Agree with{' '}
              <span className="text-[#FE8C00] mx-1">Terms of Service</span> and{' '}
              <span className="text-[#FE8C00] mx-1">Privacy Policy</span>
            </p>
          </div>
          {error && (
            <div className="flex gap-1 items-center text-red-600">
              <RiErrorWarningLine strokeWidth={1.5} />
              <p className="text-sm">{error}</p>
            </div>
          )}
          <button
            type="submit"
            className="bg-[#FE8C00] text-white rounded-[100px] p-4 text-sm font-semibold hover:bg-[#FE8C00]/80 h-[52px]"
          >
            {pending ? (
              <LuLoader2 size={20} className="animate-spin m-auto" />
            ) : (
              'Register'
            )}
          </button>
        </form>
        <div className="my-6 flex justify-center items-center space-x-4">
          <div className="w-[99.5px] h-[0.5px] bg-[#878787]"></div>
          <p className="text-sm text-[#878787] font-medium font-inter leading-[20px]">
            Or sign in with
          </p>
          <div className="w-[99.5px] h-[0.5px] bg-[#878787]"></div>
        </div>
        <div className="flex justify-center">
          <GoogleLogin
            shape="circle"
            onSuccess={(credentialResponse) => {
              const decoded = jwtDecode(credentialResponse.credential)
              setUser({
                email: decoded.email,
                name: decoded.name,
                token: credentialResponse.credential
              })
              window.localStorage.setItem(
                'loggedUser',
                JSON.stringify({
                  email: decoded.email,
                  name: decoded.name,
                  token: credentialResponse.credential
                })
              )
              navigate('/')
            }}
            onError={() => {
              console.log('Login Failed')
            }}
          />
        </div>
        <div className="text-center mt-8">
          <p className="text-sm font-medium text-[#101010]">
            Have an account?{' '}
            <NavLink
              to={'/sign-in'}
              className="text-[#FE8C00] hover:text-[#FE8C00]/80 font-semibold"
            >
              Sign in
            </NavLink>
          </p>
        </div>
      </div>
    </main>
  )
}

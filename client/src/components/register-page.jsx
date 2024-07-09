import { GoogleLogin } from '@react-oauth/google'
import React, { useContext, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { LuLoader2 } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'
import usersService from '../services/users'
import { userContext } from '../context/context'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [pending, setPending] = useState(false)
  const { setUser } = useContext(userContext)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    const email = e.target.email.value
    const name = e.target.name.value
    const password = e.target.password.value

    setPending(true)
    const registerUser = await usersService.register({ email, name, password })
    setPending(false)

    if (registerUser) {
      setUser(registerUser)
      usersService.setToken(registerUser.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(registerUser))
      navigate('/')
    }
  }

  return (
    <main className="min-h-screen flex justify-center md:py-2 bg-[#F9FAFB]">
      <div className="w-full md:w-[375px] px-6 py-10 md:py-6 bg-[#FFFFFF] rounded-lg shadow">
        <div className="max-w-[320px]">
          <h1 className="text-4xl font-medium">Create your new account.</h1>
          <p className="text-sm text-gray-500 mt-2">
            Create an account to start looking for the food you like
          </p>
        </div>
        <form onSubmit={handleRegister} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              className="border border-gray-200 rounded-lg p-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">User Name</label>
            <input
              type="name"
              id="name"
              name="name"
              placeholder="Enter Name"
              className="border border-gray-200 rounded-lg p-2 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Password"
                className="border border-gray-200 rounded-lg p-2 text-sm w-full"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2.5"
              >
                {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
              </button>
            </div>
          </div>
          <div className="max-w-[320px] flex">
            <div className="">
              <input type="checkbox" className="mr-4 border-2 " required />
            </div>
            <p className="text-sm font-medium text-slate-700">
              I Agree with{' '}
              <span className="text-[#FE8C00] mx-1">Terms of Service</span> and{' '}
              <span className="text-[#FE8C00] mx-1">Privacy Policy</span>
            </p>
          </div>
          <button
            type="submit"
            className="bg-[#FE8C00] text-white rounded-full p-2 font-medium hover:bg-[#FE8C00]/80"
          >
            {pending ? (
              <LuLoader2 size={24} className="animate-spin m-auto" />
            ) : (
              'Register'
            )}
          </button>
        </form>
        <div className="my-4 flex justify-center">
          <p className="text-sm text-gray-500">Or sign in with</p>
        </div>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse)
            }}
            onError={() => {
              console.log('Login Failed')
            }}
          />
        </div>
        <div className="text-center mt-6">
          <p className="text-sm">
            Have an account?{' '}
            <Link
              href="/sign-in"
              className="text-[#FE8C00] hover:text-[#FE8C00]/80 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

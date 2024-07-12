import { useContext, useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { GoogleLogin } from '@react-oauth/google'
import { NavLink, useNavigate } from 'react-router-dom'
import { userContext } from '../context/context'
import loginService from '../services/auth'
import usersService from '../services/users'
import { LuLoader2 } from 'react-icons/lu'
import { jwtDecode } from 'jwt-decode'
import { RiErrorWarningLine } from 'react-icons/ri'

export default function LoginPage() {
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

  const handleLogin = async (e) => {
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value

    setPending(true)
    const res = await loginService.login({ email, password })

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
      <div className="w-[375px] p-6 bg-[#ffffff] rounded-lg shadow">
        <div className="text-left">
          <h1 className="text-[32px] font-[600] leading-[40px] font-inter text-[#101010]">
            Login to your account.
          </h1>
          <p className="text-[14px] font-medium leading-[20px] font-sans text-[#878787] mt-2">
            Please sign in to your account
          </p>
        </div>
        <form onSubmit={handleLogin} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[#101010]">
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
            <label htmlFor="password" className="text-[#101010]">
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
          <div className="text-right text-sm text-[#FE8C00] hover:text-[#FE8C00]/80 font-medium my-2">
            Forgot password?
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
              'Sign In'
            )}
          </button>
        </form>
        <div className="my-6 flex justify-center items-center space-x-4">
          <div className="w-[99.5px] h-[0.5px] bg-[#878787]"></div>
          <p className="text-sm text-[#878787]">Or sign in with</p>
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
            Don't have an account?{' '}
            <NavLink
              to={'/register'}
              className="text-[#FE8C00] hover:text-[#FE8C00]/80 font-semibold"
            >
              Register
            </NavLink>
          </p>
        </div>
      </div>
    </main>
  )
}

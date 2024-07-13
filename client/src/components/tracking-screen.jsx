import React, { useContext, useEffect, useState } from 'react'
import Clock from './clock'
import { userContext } from '../context/context'
import { useNavigate } from 'react-router-dom'
import quotesService from '../services/quotes'

export default function TrackingScreen() {
  const [currentTime, setCurrentTime] = useState(null)
  const [quote, setQuote] = useState(null)
  const [speed, setSpeed] = useState(1)
  const { user } = useContext(userContext)
  const navigate = useNavigate()

  const category = [
    'computers',
    'happiness',
    'dreams',
    'experience',
    'failure',
    'family',
    'freedom',
    'funny',
    'history',
    'success'
  ]

  useEffect(() => {
    setCurrentTime(new Date())

    const fetchQuote = async () => {
      const newQuote = await quotesService.getQuote()
      setQuote(newQuote)
    }

    fetchQuote()
    setInterval(() => {
      quotesService.setCategory(
        category[Math.floor(Math.random() * category.length)]
      )
      fetchQuote()
    }, 5000)

    const params = new URLSearchParams(window.location.search)
    const savedSpeed = params.get('speed')

    if (savedSpeed) setSpeed(Number(savedSpeed))

    if (!user) {
      navigate('/sign-in')
    }
  }, [])

  const generateShareUrl = (speedVal) => {
    const baseUrl = window.location.origin + window.location.pathname

    return `${baseUrl}?speed=${speedVal}`
  }

  const handleShare = () => {
    const shareUrl = generateShareUrl(speed)

    navigator.clipboard.writeText(shareUrl)
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-between p-6 bg-[#ffffff]">
      <Clock currentTime={currentTime} speed={speed} />
      <div className="my-6 flex flex-col items-center gap-4">
        <h1 className="text-3xl font-semibold text-[#878787]">{speed}</h1>
        <input
          name="slider"
          type="range"
          id="slider"
          min={1}
          max={10}
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          className="accent-[#FE8C00] w-56 rounded-lg cursor-pointer"
        />
        <p className="text-[#878787] text-sm font-medium ">Control Speed</p>
      </div>
      <div className="w-full max-w-[400px] min-h-[100px] my-4 shadow-[0_0_5px_0_#878787] rounded-lg px-4 py-2 ">
        <p className="text-[#878787] text-sm text-center font-semibold mb-2">
          {quote?.category}
        </p>
        <h3 className="text-[#101010] text-xl font-medium text-justify">
          {quote?.quote}
        </h3>
        <p className="text-[#fe8c00] text-sm font-bold text-end">
          {quote?.author}
        </p>
      </div>
      <button
        onClick={handleShare}
        className="bg-[#FE8C00] w-full max-w-[400px] text-center text-white rounded-[100px] p-4 text-sm font-semibold hover:bg-[#FE8C00]/80 h-[52px]"
      >
        Share URL
      </button>
    </div>
  )
}

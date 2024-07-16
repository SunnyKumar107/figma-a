import { useEffect, useState } from 'react'
import Clock from './clock'
import { NavLink } from 'react-router-dom'
import quotesService from '../services/quotes'
import { FaArrowLeft } from 'react-icons/fa6'

export default function TrackingScreen() {
  const [currentTime, setCurrentTime] = useState(null)
  const [finishTime, setFinishTime] = useState(null)
  const [quote, setQuote] = useState(null)
  const [speed, setSpeed] = useState(1)
  const [copied, setCopied] = useState(false)

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
    setFinishTime(new Date(new Date().getTime() - 2 * 60 * 60 * 1000))

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
  }, [])

  const generateShareUrl = (speedVal) => {
    const baseUrl = window.location.origin + window.location.pathname

    return `${baseUrl}?speed=${speedVal}`
  }

  const handleShare = () => {
    setCopied(true)
    const shareUrl = generateShareUrl(speed)

    navigator.clipboard.writeText(shareUrl)

    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  if (!currentTime || !finishTime) return null

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-6 bg-[#ffffff]">
      <Clock
        currentTime={currentTime}
        onCurrentTimeChange={(sec) => setCurrentTime(new Date(sec))}
        speed={speed}
        finishTime={finishTime}
      />
      <div className="my-4 flex flex-col items-center gap-4">
        <h1 className="text-3xl font-semibold text-[#878787]">{speed}x</h1>
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
      {quote ? (
        <div className="w-full max-w-[400px] min-h-[100px] mt-4 shadow-[0_0_2px_0_#878787] rounded-lg px-4 py-2 ">
          <p className="text-[#878787] text-sm text-center font-inter font-semibold uppercase">
            {quote.category}
          </p>
          <h3 className="text-[#101010] text-lg font-inter font-medium text-justify my-2">
            {quote.quote}
          </h3>
          <p className="text-[#fe8c00] text-sm font-bold font-inter text-end">
            {quote.author}
          </p>
        </div>
      ) : (
        <div className="w-full max-w-[400px] min-h-[100px] mt-4 shadow-[0_0_2px_0_#878787] rounded-lg px-4 py-2 ">
          <div className="w-full h-[100px] bg-[#e4e4e4] rounded-lg"></div>
        </div>
      )}
      <button
        onClick={handleShare}
        className="bg-[#FE8C00] w-full max-w-[400px] mt-8 text-center font-inter text-white rounded-[100px] p-4 text-sm font-semibold hover:bg-[#FE8C00]/80 h-[52px]"
      >
        {copied ? 'Copied!' : 'Share URL'}
      </button>
      <div>
        <NavLink
          to={'/'}
          className="text-[#878787] text-sm font-semibold flex items-center gap-2 font-inter mt-[22px]"
        >
          <FaArrowLeft /> Back
        </NavLink>
      </div>
    </div>
  )
}

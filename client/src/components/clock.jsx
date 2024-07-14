import { useRef } from 'react'

const Clock = ({ currentTime, speed }) => {
  if (!currentTime) return null

  const hourRef = useRef()
  const minuteRef = useRef()
  const secondRef = useRef()

  let time = currentTime
  let totalSeconds = Number(time / 1000)

  const interval = setInterval(() => {
    const hours = time.getHours()
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()

    const hourDeg = 30 * hours + minutes / 2
    const minuteDeg = 6 * minutes
    const secondDeg = 6 * seconds

    if (!hourRef.current || !minuteRef.current || !secondRef.current) return
    hourRef.current.style.transform = `rotate(${hourDeg}deg)`
    minuteRef.current.style.transform = `rotate(${minuteDeg}deg)`
    secondRef.current.style.transform = `rotate(${secondDeg}deg)`

    totalSeconds--
    time = new Date(totalSeconds * 1000)
  }, 1000 / speed)

  setTimeout(() => {
    clearInterval(interval)
  }, 1000 * 60 * 120)

  return (
    <div
      className="w-56 h-56 bg-no-repeat bg-center bg-cover relative"
      style={{ backgroundImage: 'url(/clock.png)' }}
    >
      <div
        ref={hourRef}
        className="w-[8px] h-[70px] bg-[#101010] absolute top-[43px] left-[107px] rounded-2xl origin-bottom"
      ></div>
      <div
        ref={minuteRef}
        className="w-[6px] h-[80px] bg-[#101010] absolute top-[33px] left-[108.5px] rounded-2xl origin-bottom"
      ></div>
      <div
        ref={secondRef}
        className="w-[3px] h-[90px] bg-[#101010] absolute top-[23px] left-[110px] rounded-2xl origin-bottom"
      ></div>
    </div>
  )
}

export default Clock

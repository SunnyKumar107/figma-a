import React, { useRef } from 'react'

const Clock = () => {
  const hourRef = useRef()
  const minuteRef = useRef()
  const secondRef = useRef()

  setInterval(() => {
    const date = new Date()

    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    const hourDeg = 30 * hours + minutes / 2
    const minuteDeg = 6 * minutes
    const secondDeg = 6 * seconds

    hourRef.current.style.transform = `rotate(${hourDeg}deg)`
    minuteRef.current.style.transform = `rotate(${minuteDeg}deg)`
    secondRef.current.style.transform = `rotate(${secondDeg}deg)`
  }, 1000)

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

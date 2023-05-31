import { ReactEventHandler, useEffect, useState } from "react"
import Frame from "./frame"
import Time from "./time"

const TimeLine = () => {
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState<"time" | "frame">("frame")

  const open: ReactEventHandler = (e) => {
    setVisible(true)
    e.stopPropagation()
  }
  const hide = () => {
    setVisible(false)
  }

  const set = (t: typeof type) => {
    setType(t)
    hide()
  }

  useEffect(() => {
    window.document.body.addEventListener("click", hide)
    return () => {
      window.document.body.removeEventListener("click", hide)
    }
  }, [])

  return (
    <div className="text-sm relative cursor-pointer">
      {/* <Time /> */}
      <div onClick={open} className="">
        {type === "frame" ? <Frame /> : null}
        {type === "time" ? <Time /> : null}
      </div>

      <div
        className="absolute text-xs bg-gray-950"
        style={{
          top: -84,
          left: -7,
          zIndex: 999,
          borderRadius: 3,
          display: visible ? "block" : "none",
        }}
      >
        <div
          className="pt-2 pb-2 cursor-pointer text-center"
          style={{ width: 50 }}
          onClick={() => set("time")}
        >
          Time
        </div>
        <div
          className="pt-2 pb-2 cursor-pointer text-center"
          style={{ width: 50 }}
          onClick={() => set("frame")}
        >
          Frame
        </div>
      </div>
    </div>
  )
}

export default TimeLine

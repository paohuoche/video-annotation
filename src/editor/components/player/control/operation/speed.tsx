import { observer } from "mobx-react-lite"
import { ReactEventHandler, useContext, useEffect, useState } from "react"
import { EditorContext } from "../../../.."

const Speed = observer(() => {
  const { store } = useContext(EditorContext)
  const player = store.player
  const [rates] = useState([2, 1.5, 1, 0.75, 0.5, 0.25])
  const [rate, setRate] = useState(player.player?.playbackRate || 1)

  const [visible, setVisible] = useState(false)

  const open: ReactEventHandler = (e) => {
    e.stopPropagation()
    setVisible(true)
  }
  const hide = () => {
    setVisible(false)
  }

  const set = (rate: number) => {
    if (!player.player) return
    player.player.playbackRate = rate
    setRate(rate)
    hide()
  }

  useEffect(() => {
    window.document.body.addEventListener("click", hide)

    return () => {
      window.document.body.removeEventListener("click", hide)
    }
  }, [])

  return (
    <div className="cursor-pointer relative text-xs">
      <span onClick={open}>{rate}x</span>

      <div
        className="absolute bg-gray-950 text-xs"
        style={{
          top: -206,
          left: -32,
          padding: "0 12px",
          zIndex: 999,
          borderRadius: 3,
          display: visible ? "block" : "none",
        }}
      >
        {rates.map((rate) => {
          return (
            <div
              key={rate}
              className="pt-2 pb-2 cursor-pointer"
              onClick={() => set(rate)}
            >
              {rate}x
            </div>
          )
        })}
      </div>
    </div>
  )
})

export default Speed

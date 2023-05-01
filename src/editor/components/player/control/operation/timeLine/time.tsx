import dayjs from "dayjs"
import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { EditorContext } from "../../../../.."

const TimeLine = observer(() => {
  const {
    store: { player },
  } = useContext(EditorContext)
  const currentTime = formatTime(player.currentTime)

  if (!player.player) return null

  return (
    <div className="text-xs whitespace-nowrap">
      <span>{currentTime}</span>
      <span className="ml4 mr4"> / </span>
      <span>{formatTime(player.player.duration)}</span>
    </div>
  )
})

/**
 * transform the foramt ot player currentTime
 * @param time seconds
 * @returns
 */
export const formatTime = (time: number) => {
  // @ts-ignore
  return dayjs({ second: time }).format("mm:ss")
}

export default TimeLine

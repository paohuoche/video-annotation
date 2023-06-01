import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import { FaPlay, FaPause } from "react-icons/fa"
import { EditorContext } from "../../../.."
import { Tooltip } from "antd"

const play = observer(() => {
  const {
    store: { player },
  } = useContext(EditorContext)

  const play = () => {
    player.play()
    player.closePreviews()
  }

  return (
    <div>
      {player.paused ? (
        <Tooltip title="play">
          <FaPlay className="text-lg cursor-pointer" onClick={play} />
        </Tooltip>
      ) : (
        <Tooltip title="pause">
          <FaPause
            className="text-lg cursor-pointer"
            onClick={() => player.pause()}
          />
        </Tooltip>
      )}
    </div>
  )
})

export default play

import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { FaPlay, FaPause } from "react-icons/fa"
import { EditorContext } from "../../../.."

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
        <FaPlay className="text-lg cursor-pointer" onClick={play} />
      ) : (
        <FaPause
          className="text-lg cursor-pointer"
          onClick={() => player.pause()}
        />
      )}
    </div>
  )
})

export default play

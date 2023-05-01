import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import { FaFilm } from "react-icons/fa"
import { EditorContext } from "../../../.."

const preview = observer(() => {
  const {
    store: { player },
  } = useContext(EditorContext)

  const onClick = () => {
    player.openPreiews(player.currentFrame)
    player.pause()
  }

  return (
    <div onClick={onClick}>
      <FaFilm className="text-lg cursor-pointer" />
    </div>
  )
})

export default preview

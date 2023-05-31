import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import { FaCut } from "react-icons/fa"
import { EditorContext } from "../../../.."

const createRange = observer(() => {
  const {
    store: { player, group, current },
  } = useContext(EditorContext)

  const open = () => {
    if (!player.player) return

    player.pause()

    let newGroup = group.add({
      range: [player.currentFrame, player.currentFrame],
    })
    current.setGroup(newGroup.id)
    current.setRange(newGroup.range)
  }

  return (
    <div onClick={open}>
      <FaCut className="text-lg cursor-pointer" />
    </div>
  )
})

export default createRange

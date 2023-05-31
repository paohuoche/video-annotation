import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import { EditorContext } from "../../../../.."

const index = observer(() => {
  const {
    store: { player },
  } = useContext(EditorContext)
  return (
    <div className="text-xs cursor-pointer whitespace-nowrap">
      {player.currentFrame} / {player.totalFrames}
    </div>
  )
})

export default index

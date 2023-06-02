import { Tooltip } from "antd"
import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import { FaArrowLeft } from "react-icons/fa"
import { EditorContext } from "../../../../.."

const previous = observer(() => {
  const {
    store: { current, group, player },
  } = useContext(EditorContext)

  const onClick = () => {
    if (!current.groupId) return

    const groupInfo = group.group[current.groupId]
    if (groupInfo.frames.order.length() === 0) {
      return
    }

    const frame = groupInfo.frames.order.previousElement(player.currentFrame)
    player.jumpto(frame)
  }

  return (
    <div onClick={onClick}>
      <Tooltip title="previous labeled frame" placement="bottom">
        <FaArrowLeft className="text-lg cursor-pointer" />
      </Tooltip>
    </div>
  )
})

export default previous

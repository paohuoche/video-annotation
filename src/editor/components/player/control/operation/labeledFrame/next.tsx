import { Tooltip } from "antd"
import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import { FaArrowRight } from "react-icons/fa"
import { EditorContext } from "../../../../.."

const next = observer(() => {
  const {
    store: { current, group, player },
  } = useContext(EditorContext)

  const onClick = () => {
    if (!current.groupId) return

    const groupInfo = group.group[current.groupId]
    // const targetFrame = root.current.currentFrame === 0 ? 0 : root.current.currentFrame - 1

    if (groupInfo.frames.order.length() === 0) {
      return
    }

    const frame = groupInfo.frames.order.nextElement(player.currentFrame)
    player.jumpto(frame)
  }

  return (
    <div onClick={onClick}>
      <Tooltip title="next labeled frame" placement="bottom">
        <FaArrowRight className="text-lg cursor-pointer" />
      </Tooltip>
    </div>
  )
})

export default next

import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { FaForward } from "react-icons/fa"
import { EditorContext } from "../../../../.."
import { Tooltip } from "antd"

const Forward = observer(() => {
  const {
    store: { player },
  } = useContext(EditorContext)
  const onClick = () => {
    player.forward(10)
  }

  return (
    <div onClick={onClick}>
      <Tooltip title="forward 10 frames">
        <FaForward className="text-lg cursor-pointer" />
      </Tooltip>
    </div>
  )
})

export default Forward

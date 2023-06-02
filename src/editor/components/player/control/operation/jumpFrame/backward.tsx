import { useContext } from "react"
import { observer } from "mobx-react-lite"
import { FaBackward } from "react-icons/fa"
import { EditorContext } from "../../../../.."
import { Tooltip } from "antd"

const Backward = observer(() => {
  const {
    store: { player },
  } = useContext(EditorContext)

  const onClick = () => {
    player.backward(10)
  }

  return (
    <div onClick={onClick}>
      <Tooltip title="backward 10 frames" placement="bottom">
        <FaBackward className="text-lg cursor-pointer" />
      </Tooltip>
    </div>
  )
})

export default Backward

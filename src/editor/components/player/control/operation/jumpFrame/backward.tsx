import { useContext } from "react"
import { observer } from "mobx-react-lite"
import { FaBackward } from "react-icons/fa"
import { EditorContext } from "../../../../.."

const Backward = observer(() => {
  const {
    store: { player },
  } = useContext(EditorContext)

  const onClick = () => {
    player.backward(10)
  }

  return (
    <div onClick={onClick}>
      <FaBackward className="text-lg cursor-pointer" />
    </div>
  )
})

export default Backward

import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { FaForward } from "react-icons/fa"
import { EditorContext } from "../../../../.."

const Forward = observer(() => {
  const {
    store: { player },
  } = useContext(EditorContext)
  const onClick = () => {
    player.forward(10)
  }

  return (
    <div onClick={onClick}>
      <FaForward className="text-lg cursor-pointer" />
    </div>
  )
})

export default Forward

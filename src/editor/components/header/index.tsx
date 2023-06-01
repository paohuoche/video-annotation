import React, { useContext } from "react"
import { EditorContext, SideBarWidth } from "../.."
import { TbRectangle } from "react-icons/tb"
import { FaRegDotCircle, FaTrashAlt } from "react-icons/fa"
import { observer } from "mobx-react-lite"
import { Tooltip } from "antd"

const Header = observer(() => {
  const {
    store: { current, shapes, player },
    drawing,
  } = useContext(EditorContext)

  const clearCurrentFrame = () => {
    const shapesObj = shapes.get({
      groupId: current.groupId,
      frame: player.currentFrame,
    })
    let shapeIds = Object.keys(shapesObj)
    drawing.del(shapeIds)
    shapes.clearFrame(current.groupId, player.currentFrame)
  }

  return (
    <div className="flex h-full">
      <div style={{ flexBasis: SideBarWidth }}></div>
      <div className="grow flex justify-center items-center">
        <div className="flex space-x-8 items-center">
          <Tooltip title="Rectangle">
            <div
              className={
                "p-1 text-2xl cursor-pointer rounded-sm hover:text-red-500 " +
                (current.shapeType === "Rectangle"
                  ? "text-red-500 shadow-md"
                  : "")
              }
              onClick={() => {
                if (current.shapeType === "Rectangle") {
                  current.clearShapeType()
                } else {
                  current.setShapeType("Rectangle")
                }
              }}
            >
              <TbRectangle />
            </div>
          </Tooltip>
          <Tooltip title="Point">
            <div
              className={
                "p-1 text-xl cursor-pointer rounded-sm hover:text-red-500 " +
                (current.shapeType === "Point" ? "text-red-500 shadow-md " : "")
              }
              onClick={() => {
                if (current.shapeType === "Rectangle") {
                  current.clearShapeType()
                } else {
                  current.setShapeType("Point")
                }
              }}
            >
              <FaRegDotCircle />
            </div>
          </Tooltip>

          <Tooltip title="Delete all shapes of current frame">
            <div className="p-1 text-lg cursor-pointer">
              <FaTrashAlt onClick={clearCurrentFrame} />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  )
})

export default Header

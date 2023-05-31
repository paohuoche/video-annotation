import { observer } from "mobx-react-lite"
import React, { ReactEventHandler, useContext, useEffect } from "react"
import { FaTrash, FaTrashAlt } from "react-icons/fa"
import { EditorContext } from "../.."
import { ShapesType } from "../../store/shapes/types"

const Results = observer(() => {
  const {
    store: { group },
  } = useContext(EditorContext)

  return (
    <div className="">
      {Object.keys(group.group).map((gid) => {
        return <Group key={gid} gid={gid} />
      })}
    </div>
  )
})

const Group = observer((props: { gid: string }) => {
  const {
    store: { current, shapes, player, group },
    drawing,
  } = useContext(EditorContext)

  const shapeValues = group.getShapes(props.gid)

  /**
   * switch the visibility of shapes
   */
  useEffect(() => {
    const shapesValue = shapes.get({
      groupId: props.gid,
      frame: player.currentFrame,
    })
    const ids = Object.keys(shapesValue)

    if (props.gid === current.groupId) {
      drawing.hideAll()
      drawing.show(ids)
    }
  }, [current.groupId, player.currentFrame])

  /**
   * delete a group and all shapes belong to it
   */
  const deleteGroup = () => {
    group.delete(props.gid)

    const shapesid = shapeValues.map((s) => s.id)
    drawing.del(shapesid)
  }

  return (
    <div
      className={
        "p-2 border-b border-l-4 " +
        (props.gid === current.groupId ? "border-l-red-500" : "")
      }
    >
      <Title
        gid={props.gid}
        shapeValues={shapeValues}
        deleteGroup={deleteGroup}
      />
      <Shapes gid={props.gid} shapeValues={shapeValues} />
    </div>
  )
})

const Title = observer(
  (props: {
    gid: string
    shapeValues: ShapesType.Value[]
    deleteGroup: () => void
  }) => {
    const {
      store: { group },
    } = useContext(EditorContext)

    const groupValue = group.get(props.gid)

    const selectGroup = () => {
      group.focus(props.gid)
    }
    const deleteGroup: ReactEventHandler = (e) => {
      e.stopPropagation()
      props.deleteGroup()
    }

    return (
      <p
        className="flex justify-between items-center cursor-pointer"
        onClick={selectGroup}
      >
        <span className="text-sm">
          {groupValue.range[0]} - {groupValue.range[1]}
        </span>

        <FaTrashAlt
          className="text-xs cursor-pointer text-gray-600"
          onClick={deleteGroup}
        />
      </p>
    )
  }
)

const Shapes = (props: { gid: string; shapeValues: ShapesType.Value[] }) => {
  const { drawing } = useContext(EditorContext)

  return (
    <div>
      {props.shapeValues.map((shape) => {
        return (
          <Shape
            key={shape.id}
            groupId={props.gid}
            shapeId={shape.id}
            frame={shape.frame}
            classification={shape.classification}
            color={drawing.get(shape.id).color}
          />
        )
      })}
    </div>
  )
}

const Shape = observer(
  (props: {
    shapeId: string
    frame: number
    classification: string
    color: string
    groupId: string
  }) => {
    const {
      store: { current, shapes, player, group },
      drawing,
    } = useContext(EditorContext)

    const selectShape = () => {
      drawing.focus(props.shapeId)
      current.setShapeId(props.shapeId)
      group.focus(props.groupId)
      player.jumpto(props.frame)
    }

    const deleteShape: ReactEventHandler = (e) => {
      e.stopPropagation()
      drawing.del(props.shapeId)
      shapes.delete({
        frame: props.frame,
        groupId: props.groupId,
        shapeId: props.shapeId,
      })
    }

    return (
      <div
        className="flex justify-between items-center p-4 pt-1 pb-1 mt-2 text-white radius rounded-sm cursor-pointer"
        style={{ backgroundColor: props.color }}
        onClick={selectShape}
      >
        <p className="text-sm">
          <p>classification: {props.classification}</p>
          <p>frame: {props.frame}</p>
        </p>
        <FaTrash
          className="text-xs cursor-pointer text-white"
          onClick={deleteShape}
        />
      </div>
    )
  }
)

export default Results

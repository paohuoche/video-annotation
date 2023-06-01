import React, { memo, useContext } from "react"
import Drawing, { DrawingProps } from "@paohuoche/react-drawing-library"
import { message } from "antd"
import { observer } from "mobx-react-lite"
import { EditorContext } from "../../.."

const DrawingArea = observer(
  (props: {
    stageInfo: {
      width: number
      height: number
      aspectRatio: number
      x: number
      y: number
    }
  }) => {
    const { width, height, aspectRatio, x, y } = props.stageInfo
    const {
      store: { current, labels, shapes, player },
      drawing,
    } = useContext(EditorContext)

    const classification = current.classification
    const color = labels.value?.[current.classification]?.color!
    const groupId = current.groupId
    const frame = player.currentFrame

    let draw = undefined

    const beforeCreate = async () => {
      if (!current.shapeType) {
        message.warning({
          key: "beforeCreate-warning",
          content: "please select shape!",
        })
        return false
      } else if (!classification) {
        message.warning({
          key: "beforeCreate-warning",
          content: "please select classification!",
        })
        return false
      } else if (!groupId) {
        message.warning({
          key: "beforeCreate-warning",
          content: "please create time range selector!",
        })
        return false
      } else {
        return true
      }
    }

    const onCreate: DrawingProps["onCreate"] = (value) => {
      shapes.add(
        {
          frame,
          groupId,
          value: {
            groupId,
            shapeId: value.id,
            classification,
            id: value.id,
            frame,
          },
        },
        classification
      )
    }

    const onDelete: DrawingProps["onDelete"] = (id) => {
      // drawing.del(value.id)
      shapes.delete({
        frame: player.currentFrame,
        groupId: current.groupId,
        shapeId: id,
      })
    }

    if (current.shapeType) {
      draw = {
        type: current.shapeType,
        color,
      }
    }

    return (
      <div style={{ width, height }}>
        <Drawing
          beforeCreate={beforeCreate}
          onCreate={onCreate}
          onDelete={onDelete}
          draw={draw}
          bounding={{
            width,
            height,
            x,
            y,
            scale: 1,
          }}
          shapes={drawing}
          width={width}
          height={height}
        />
      </div>
    )
  }
)

export default memo(DrawingArea)

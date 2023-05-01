import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import { EditorContext } from "../.."
import { LabelTypes } from "../../store/labels/types"

const Labels = observer(() => {
  const {
    store: { labels, current },
  } = useContext(EditorContext)

  if (!labels.value) return null

  const labelslist = Object.values(labels.value)

  const onClick = (label: LabelTypes.Value) => {
    current.setClass(label.classification)
  }

  return (
    <div className="p-2 pt-4 pb-4">
      <div className="space-x-2">
        {labelslist.map((label) => {
          return (
            <div
              onClick={() => onClick(label)}
              className="inline-block p-2 pt-1 pb-1 text-sm rounded cursor-pointer leading-none"
              style={{
                color:
                  current.classification === label.classification
                    ? "#fff"
                    : label.color,
                backgroundColor:
                  current.classification === label.classification
                    ? label.color
                    : "transparent",
                border: `1px solid ${label.color}`,
              }}
            >
              {label.classification}
            </div>
          )
        })}
      </div>
    </div>
  )
})

export default Labels

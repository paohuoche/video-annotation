import { Tooltip } from "antd"
import React from "react"
import { FaArrowLeft } from "react-icons/fa"

const previous = () => {
  return (
    <div>
      <Tooltip title="previous labeled frame">
        <FaArrowLeft className="text-lg cursor-pointer" />
      </Tooltip>
    </div>
  )
}

export default previous

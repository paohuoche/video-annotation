import { Tooltip } from "antd"
import React from "react"
import { FaArrowRight } from "react-icons/fa"

const next = () => {
  return (
    <div>
      <Tooltip title="next labeled frame">
        <FaArrowRight className="text-lg cursor-pointer" />
      </Tooltip>
    </div>
  )
}

export default next

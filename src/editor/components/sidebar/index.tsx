import React from "react"
import Labels from "./labels"
import Results from "./results"

const index = () => {
  return (
    <div>
      <div className="border-b">
        <Labels />
      </div>
      <Results />
    </div>
  )
}

export default index

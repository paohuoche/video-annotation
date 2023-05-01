import { useState } from "react"
import Drawing, { DrawingProps, useDrawing } from "react-drawing-library"

// import DrawingProps from 'react-drawing-library/dist/esm/'
// import { Stage } from "react-konva"

const shapeDraw: DrawingProps["draw"] = {
  type: "Rectangle",
  color: "#52acff",
  text: "aa",
}

function App() {
  const imageUrl =
    "https://tse1-mm.cn.bing.net/th/id/OIP-C.rQ9MEBHEGcjQ8Yc2YB23YQHaEj?w=315&h=193&c=7&r=0&o=5&dpr=2&pid=1.7"

  const shapes = useDrawing()

  const [draw, setDraw] = useState<DrawingProps["draw"] | undefined>(shapeDraw)

  return (
    <div>
      <button onClick={() => setDraw(undefined)}>clear draw</button>
      <button onClick={() => setDraw(shapeDraw)}>rectangle</button>
      <button onClick={() => console.log(shapes.shapes)}>console shapes</button>
      <Drawing
        draw={draw}
        shapes={shapes}
        imageUrl={imageUrl}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </div>
  )
}

export default App

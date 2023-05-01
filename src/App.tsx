import { useEffect, useState } from "react"
import Drawing, { DrawingProps, useDrawing } from "react-drawing-library"
import Editor, { useEditor } from "./editor"
import videoFile from "./sintel-short.mp4"
// import DrawingProps from 'react-drawing-library/dist/esm/'
// import { Stage } from "react-konva"

const shapeDraw: DrawingProps["draw"] = {
  type: "Rectangle",
  color: "red",
  // text: "aa",
}

function Test() {
  const imageUrl =
    "https://tse1-mm.cn.bing.net/th/id/OIP-C.rQ9MEBHEGcjQ8Yc2YB23YQHaEj?w=315&h=193&c=7&r=0&o=5&dpr=2&pid=1.7"

  const shapes = useDrawing()

  const [draw, setDraw] = useState<DrawingProps["draw"] | undefined>(shapeDraw)

  return (
    // <Editor editor={editor} url={videoFile} />
    <div>
      <button onClick={() => setDraw(shapeDraw)}>Rectangle</button>
      <button
        onClick={() =>
          setDraw({
            type: "Point",
            color: "red",
            // text: "aa",
          })
        }
      >
        Point
      </button>
      <div>
        <button
          onClick={() => {
            if (draw) {
              setDraw(() => ({ ...draw, color: "yellow" }))
            }
          }}
        >
          yellow
        </button>
      </div>
      <div>
        <button onClick={() => setDraw(undefined)}>undraw</button>
        <button onClick={() => shapes.unfocus()}>unfocus</button>
        <button onClick={() => console.log(shapes.shapes)}>
          console shapes
        </button>
      </div>
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

function App() {
  const fps = 30
  const editor = useEditor({ fps })

  useEffect(() => {
    editor.store.labels.setLabel({
      label1: {
        color: "#f59e0b",
        classification: "label1",
      },
      label2: {
        color: "#16a34a",
        classification: "label2",
      },
      label3: {
        color: "#0ea5e9",
        classification: "label3",
      },
    })
  }, [])

  return <Editor editor={editor} url={videoFile} />
}

export default App

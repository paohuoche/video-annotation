import { useEffect } from "react"
import Editor, { useEditor } from "./editor"

// import DrawingProps from 'react-drawing-library/dist/esm/'
// import { Stage } from "react-konva"

const videoFile =
  "https://dl.dropboxusercontent.com/1/view/5y7znw1bpt2h69q/190516_06_AZ-LAGOA-30.mp4"

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

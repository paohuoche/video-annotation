import { useEffect } from "react"
import Editor, { useEditor } from "./editor"

// import DrawingProps from 'react-drawing-library/dist/esm/'
// import { Stage } from "react-konva"

const videoFile =
  "https://joy.videvo.net/videvo_files/video/premium/partners0236/large_watermarked/BB_6bdddd91-cba1-45ef-b9ca-793a7692e6e5_preview.mp4"

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

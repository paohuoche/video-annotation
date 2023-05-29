import React, { useState } from "react"
import Player from "./components/player"
import { useDrawing } from "@paohuoche/react-drawing-library"
import Header from "./components/header"
import Store from "./store"
import dayjs from "dayjs"
import Preview from "./components/player/preview"
import Sidebar from "./components/sidebar"
var objectSupport = require("dayjs/plugin/objectSupport")
dayjs.extend(objectSupport)

export const ShapeSwitchWidth = 46
export const SideBarWidth = 240
export const MarkerWidth = ShapeSwitchWidth + SideBarWidth
export const EditorHeaderHeight = 56
export const PreviewHeight = 150
export const PlayOperationHeight = 60
export const ProgressBarHeight = 12
export const ControllBarHeight = PlayOperationHeight + ProgressBarHeight

export const EditorContext = React.createContext<ReturnType<typeof useEditor>>(
  null!
)

function Editor(props: { editor: ReturnType<typeof useEditor>; url: string }) {
  return (
    <EditorContext.Provider value={props.editor}>
      <div className="h-screen w-screen">
        <div className="flex flex-col h-full">
          <div className="basis-14  border-b border-gray-200">
            <Header />
          </div>
          <div
            className="grow flex"
            style={{ maxHeight: "calc(100vh - 56px)" }}
          >
            <div
              className="max-h-full h-full overflow-y-auto border-r border-gray-200"
              style={{ width: SideBarWidth }}
            >
              <Sidebar />
            </div>
            <div className="grow max-h-full h-full flex flex-col">
              <div className="grow" id="player">
                <Player url={props.url} />
              </div>
              <div
                className="border-t border-gray-200 overflow-x-auto overflow-y-hidden"
                style={{
                  flexBasis: PreviewHeight,
                  // width: "calc(100vw - 240px)",
                }}
              >
                <Preview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </EditorContext.Provider>
  )
}

export const useEditor = (params: { fps: number }) => {
  const [store] = useState(new Store(params.fps))
  const drawing = useDrawing()

  return { store, drawing }
}

export default Editor

import { observer } from "mobx-react-lite"
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { EditorContext, PreviewHeight, SideBarWidth } from "../../.."
import { getThumbNailUrl } from "../control/progressBar/thumbnail"
import { FaFilm } from "react-icons/fa"

const Preview = observer(() => {
  const {
    store: { player },
  } = useContext(EditorContext)
  const aspectRatio = player.aspectRatio
  const previewPoints = player.previewFrames
  const thumbNailVideo = player.thumbNailVideo

  const currentFrame = player.currentFrame

  // preview url in actual
  const [urls, setUrls] = useState<{ url: string; frame: number }[]>([])

  // flag
  const [isFetching, setIsFetching] = useState(false)

  const preview_height = PreviewHeight - 18

  useEffect(() => {
    if (!thumbNailVideo) return
    try {
      setIsFetching(true)
      let tmp: { url: string; frame: number }[] = []
      ;(async function () {
        for (let i = 0; i < previewPoints.length; i++) {
          let frame = previewPoints[i]
          let time = player.frameTotime(frame)
          if (player.frameUrl[frame]) {
            tmp.push({
              url: player.frameUrl[frame],
              frame,
            })
          } else {
            let url = await getThumbNailUrl(
              thumbNailVideo,
              time,
              preview_height,
              preview_height * aspectRatio
            )
            tmp.push({
              url,
              frame,
            })
          }
        }
        setUrls(tmp)
        setIsFetching(false)
      })()
    } catch (error) {
      setIsFetching(false)
    }
    // }, [context.state.frameUrl, previewPoints])
  }, [previewPoints, thumbNailVideo, player.frameUrl]) // considering the update of frameUrl will rerender this componenent, so delete it

  const jumpTo = useCallback((frame: number) => {
    player.jumpto(frame)
  }, [])

  let children: React.ReactNode = null

  if (isFetching) {
    children = (
      <div
        style={{ lineHeight: "150px" }}
        className="w-full text-center text-sm text-gray-400"
      >
        loading...
      </div>
    )
  } else {
    children = urls.map((url) => {
      return (
        <Item
          key={url.frame}
          frame={url.frame}
          url={url.url}
          width={preview_height * aspectRatio}
          height={preview_height}
          currentFrame={currentFrame}
          jumpTo={jumpTo}
        />
      )
    })
  }

  return (
    <div
      className="flex"
      style={{
        overflowX: "auto",
        height: PreviewHeight,
        maxWidth: `calc(100vw - ${SideBarWidth}px)`,
      }}
    >
      {children}
    </div>
  )
})

const Item = memo(
  (props: {
    url: string
    width: number
    height: number
    frame: number
    currentFrame: number
    jumpTo: (frame: number) => void
  }) => {
    const itemRef = useRef<HTMLDivElement>(null!)
    useEffect(() => {
      if (props.currentFrame === props.frame) {
        setTimeout(() => {
          itemRef.current?.scrollIntoView({ inline: "center" })
        }, 0)
      }
    }, [])

    return (
      <div
        onClick={() => props.jumpTo(props.frame)}
        ref={itemRef}
        className="cursor-pointer"
        style={{
          border: props.currentFrame === props.frame ? "4px solid red" : "none",
          flexBasis: props.width,
          flexShrink: 0,
          width: props.width,
          height: props.height,
          background: `no-repeat center / contain url(${props.url})`,
        }}
      >
        {/* <img src={props.url} alt="preview" style={{ height: 100 }} /> */}
        <div className="text-white m-2 mt-1">{props.frame}</div>
      </div>
    )
  }
)

export default observer(() => {
  const {
    store: { player },
  } = useContext(EditorContext)
  const previewFrames = player.previewFrames

  if (previewFrames.length === 0) {
    return (
      <div className="h-full flex justify-center items-center bg-slate-50">
        <span className="whitespace-nowrap text-sm text-gray-400">
          <span>click</span>
          <FaFilm className="inline ml-2 mr-2  text-lg cursor-pointer" />
          <span>to display preview of frames</span>
        </span>
      </div>
    )
  }
  return <Preview />
})

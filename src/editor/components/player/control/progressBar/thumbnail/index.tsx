// import { LoadingOutlined } from '@ant-design/icons'
// import { PlayerContext } from 'components/DAS/Editor/v2/Editor/video/editor'
import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
import { EditorContext } from "../../../../.."

export const ThumbnailNail_Height = 120
export const Thumbnail = observer(
  (props: {
    targetTime: number // time, secondes
    isMoving: boolean // 正在进度条上移动
  }) => {
    const {
      store: { player },
    } = useContext(EditorContext)
    const video = player.thumbNailVideo
    const [url, setUrl] = useState("")

    useEffect(() => {
      if (!video) return

      let frame = player.timeToFrame(props.targetTime)
      if (player.getFrameUrl(frame)) {
        setUrl(player.getFrameUrl(frame))
        return
      }

      if (props.isMoving) {
        setUrl("")
        return
      }

      ;(async function () {
        const url = await getThumbNailUrl(
          video,
          props.targetTime,
          ThumbnailNail_Height,
          ThumbnailNail_Height * player.aspectRatio
        )
        setUrl(url)
        player.setFrameUrl(frame, url)
        // player.action.setFrameUrl((obj) => ({ ...obj, [frame]: url }))
      })()
      // }, [props.targetTime, props.isMoving, player.state.frameUrl])
    }, [props.targetTime, props.isMoving, player.frameUrl, video])

    let element = <div className="text-white text-sm p-2">loading...</div>

    if (url) {
      element = <img src={url} alt="thumbnail" />
    }

    return (
      <div className="bg-gray-900 " style={{ height: ThumbnailNail_Height }}>
        {element}
      </div>
    )
  }
)

/**
 * get the thumbanail image of a specific cuurentTime
 * @param video
 * @param targetTime
 * @param height 图形高度
 * @param width  图形宽度    视频画面比例： width / height
 * @returns
 */
export const getThumbNailUrl = (
  video: HTMLVideoElement,
  targetTime: number,
  height: number,
  width: number
) => {
  return new Promise<string>((resolve) => {
    const canvas = document.createElement("canvas")
    canvas.height = height
    canvas.width = width
    canvas.style.fontSize = "0"

    const ctx = canvas.getContext("2d")

    video.onseeked = () => {
      if (!ctx) return

      ctx.drawImage(video, 0, 0, width, height)
      const frame = ctx.getImageData(0, 0, width, height)

      ctx.putImageData(frame, 0, 0)
      let base64ImageData = canvas.toDataURL()
      resolve(base64ImageData)
    }

    // console.log(targetTime)
    video.currentTime = targetTime
  })
}

export default Thumbnail

import React, { useContext, useEffect, useRef, useState } from "react"
// import Control from "../control"

import Control from "./control"
import { ControllBarHeight, EditorContext } from "../.."
import Drawing from "./drawing"
import { observer } from "mobx-react-lite"

export type VideoType = {
  // onLoaded?: (params: { width: number; height: number }) => void
  // videoRef: RefObject<HTMLVideoElement>
  url: string
}
const PlayerComponent = observer((props: VideoType) => {
  const {
    store: { player },
  } = useContext(EditorContext)
  const videoContainerRef = useRef<HTMLDivElement>(null!)
  const videoRef = useRef<HTMLVideoElement>(null!)
  // const [fragment, setFragment] = useState<[number, number][]>([]) // cache fragment : [begin, end], second

  const [isLoaded, setIsLoaded] = useState(false)
  const [seeking, setSeeking] = useState(false)
  const [stageInfo, setStageInfo] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    aspectRatio: 1,
  })

  /**
   * video events - onLoadedMetadata
   */
  const onLoadedMetadata = () => {
    setIsLoaded(true)
  }

  /**
   * onTimeUpdate
   */
  const onTimeUpdate = () => {
    let ct = videoRef.current.currentTime
    player.setCurrentTime(ct)

    // update the state variable of current frame
    let cf = Number(((ct * 1000) / player.singleFrameDuration).toFixed(0))
    player.setCurrentFrame(cf)
  }

  /**
   * onEnded
   */
  const onEnded = () => {
    player.pause()
  }

  /**
   * onSeeking
   */
  const onSeeking = () => {}

  /**
   * onSeedend
   */
  const onSeeked = () => {}

  /**
   * onProgress
   */
  const onProgress: React.ReactEventHandler<HTMLVideoElement> = (event) => {
    const video = videoRef.current

    let fragments: [number, number][] = []
    for (let i = 0; i < video.buffered.length; i++) {
      fragments.push([video.buffered.start(i), video.buffered.end(i)])
    }
    player.setFragments(fragments)
    // player.setPercent(event.per)
    // console.log(event)
  }

  /**
   * calculate the stage info / generate cloned video element for thumbNail
   */
  useEffect(() => {
    if (!isLoaded) return
    const video = videoRef.current

    const container = videoContainerRef.current.getBoundingClientRect()

    const aspectRatio = video.videoWidth / video.videoHeight
    const containerRate = container.width / container.height

    video.style.width = container.width + "px"
    video.style.height = container.height + "px"

    player.setPlayer(video)
    player.setTotalFrames((video.duration * 1000) / player.singleFrameDuration)
    player.setAspectRatio(aspectRatio)

    /**
     * drawing stage information
     */
    const { width, height } = video.getBoundingClientRect()

    let pos = {
      x:
        aspectRatio <= containerRate
          ? (container.width - aspectRatio * container.height) / 2
          : 0,
      y:
        aspectRatio <= containerRate
          ? 0
          : (container.height - container.width / aspectRatio) / 2,
    }

    setStageInfo({
      ...pos,
      width,
      height,
      aspectRatio,
    })

    /**
     * append cloned video, used for display thumbNail
     */
    const thumbNailVideo = video.cloneNode(true) as HTMLVideoElement
    thumbNailVideo.muted = true
    thumbNailVideo.style.display = "none"
    player.setThumbNailVideo(thumbNailVideo)
    window.document.body.append(thumbNailVideo)

    return () => {
      thumbNailVideo.remove()
    }
  }, [isLoaded])

  return (
    <div className="h-full flex flex-col">
      <div ref={videoContainerRef} className="grow bg-gray-950">
        <video
          crossOrigin="anonymous"
          muted
          // className="h-full w-full"
          ref={videoRef}
          onLoadedMetadata={onLoadedMetadata}
          onSeeking={onSeeking}
          onSeeked={onSeeked}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
          onProgress={onProgress}
        >
          {/* {props.url ? <source src={props.url} type="video/mp4" /> : null} */}
          <source src={props.url} type="video/mp4" />
        </video>
        {
          // !isLoaded ? (
          //   <div
          //     className="pa t0 l0 r0 b0"
          //     style={{ background: "rgba(0,0,0,.3)" }}
          //   >
          //     <span
          //       className="c-fff pa"
          //       style={{
          //         left: "50%",
          //         top: "50%",
          //         transform: "translate(-50%, -50%)",
          //       }}
          //     >
          //       载入中...
          //     </span>
          //   </div>
          // ) : null
        }
        {
          // seeking ? (
          //   <div className="pa t0 r0 p16">
          //     <Spin
          //       indicator={
          //         <LoadingOutlined style={{ fontSize: 24, color: "#fff" }} spin />
          //       }
          //     />
          //   </div>
          // ) : null
        }
      </div>

      {/**
       * control bar
       */}
      <div style={{ height: ControllBarHeight }} className="bg-gray-950">
        {isLoaded ? <Control /> : null}
      </div>

      {/**
       * drawing stage
       */}
      {isLoaded && stageInfo.width !== 0 ? (
        <div className="absolute ">
          <Drawing stageInfo={stageInfo} />
        </div>
      ) : null}
    </div>
  )
})

export default PlayerComponent

import { observer } from "mobx-react-lite"
import React, { useContext, useRef, useState } from "react"
import { EditorContext, ProgressBarHeight, SideBarWidth } from "../../../.."
import styles from "./index.module.scss"
import Thumbnail, { ThumbnailNail_Height } from "./thumbnail"
import Selection from "./selection"

/**
 * 更新缩略图 和 时间位置只是标
 * @param time time of thumbnail preview
 * @param x    indicator position
 */
export type Update_Thumbnial_Indicator = (offsetX: number) => void

const PADDING_LEFT = 12

const ProgressBar = observer(() => {
  const progressBarRef = useRef<HTMLDivElement>(null!)
  const indicatorRef = useRef<HTMLDivElement>(null!)
  const thumbnailRef = useRef<HTMLDivElement>(null!)
  const {
    store: { player },
  } = useContext(EditorContext)
  const [targetTime, setTargetTime] = useState(0) // time: secondes
  const [isMoving, setIsMoving] = useState(false)

  const aspectRatio = player.aspectRatio
  const thumbnailNail_width = ThumbnailNail_Height * aspectRatio

  // 播放进度百分比
  const percent = player.currentTime / (player.player?.duration || 1)

  const timerRef = useRef(0)
  const progressBarWidth = progressBarRef.current?.getBoundingClientRect().width

  /**
   * update the position of thumbnail indicator
   * @returns
   */
  const update_thumbnial_indicator: Update_Thumbnial_Indicator = (
    offsetX: number
  ) => {
    if (!player.player) return

    const per = offsetX / progressBarWidth
    const time = per * player.player.duration

    setTargetTime(time)

    // isMoving
    window.clearTimeout(timerRef.current)
    setIsMoving(true)
    timerRef.current = window.setTimeout(() => {
      setIsMoving(false)
    }, 100)

    try {
      indicatorRef.current.style.transform = `translateX(${offsetX - 1}px)`
      let left = "auto"
      let right = "auto"
      if (offsetX < thumbnailNail_width / 2) {
        left = "0"
      } else if (offsetX > progressBarWidth - thumbnailNail_width / 2) {
        right = "0"
      } else {
        left = offsetX - thumbnailNail_width / 2 + "px"
      }
      thumbnailRef.current.style.left = left
      thumbnailRef.current.style.right = right
    } catch (error) {}
  }

  /**
   * 鼠标在进度条上移动
   */
  const handleMouseMove: React.MouseEventHandler = (e) => {
    // is changing the time selection scope
    if (e.buttons === 1) {
      return
    }

    const offsetX = e.clientX - PADDING_LEFT - SideBarWidth

    update_thumbnial_indicator(offsetX)
  }

  /**
   * click on progress bar - update the currenttime of vidoe
   */
  const handleClick: React.MouseEventHandler = (e) => {
    if (!player.player) return null

    /**
     * change currentTime
     */
    const toLeft = e.clientX - PADDING_LEFT - SideBarWidth
    const per = toLeft / progressBarRef.current.getBoundingClientRect().width
    const duration = player.player.duration
    let sec = Number((duration * per).toFixed(3))
    player.player.currentTime = sec

    if (player.paused) {
      const frame = player.timeToFrame(sec)
      player.closePreviews()
      player.openPreiews(frame)
    }
  }

  if (!player.player) {
    return null
  }

  const instance = player.player
  return (
    <div
      className="relative"
      style={{ height: ProgressBarHeight, padding: `0 ${PADDING_LEFT}px` }}
      id="progressBarWrapper"
    >
      <div
        ref={progressBarRef}
        className={styles.hoverPointer + " relative"}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
      >
        {/* 底色框 */}
        <div className="bg-gray-600" style={{ height: ProgressBarHeight }} />

        {/* preload section */}
        {player.fragments.map((frag) => {
          let left = (frag[0] / instance.duration) * progressBarWidth
          let width =
            ((frag[1] - frag[0]) / instance.duration) * progressBarWidth
          return (
            <div
              className="bg-gray-400 absolute top-0"
              style={{ height: ProgressBarHeight, left, width }}
            ></div>
          )
        })}

        {/* 预览图 */}
        <div
          className={styles.thumbnailWrapper}
          ref={thumbnailRef}
          style={{
            top: -`${ThumbnailNail_Height + 28}`,
            height: ThumbnailNail_Height,
            width: ThumbnailNail_Height * player.aspectRatio,
          }}
        >
          <Thumbnail targetTime={targetTime} isMoving={isMoving} />
        </div>

        {/**
         * 红色进度条
         */}
        <div
          className="absolute top-0 left-0 bg-red-600 w-full origin-left"
          style={{
            height: ProgressBarHeight,
            transform: `scaleX(${percent})`,
          }}
        />

        {/* 鼠标移动指示标 */}
        <div
          className={"absolute top-0 left-0 " + styles["progress-indicator"]}
          ref={indicatorRef}
          style={{
            height: ProgressBarHeight,
            width: 1,
            backgroundColor: "white",
          }}
        />

        {/* 时间选择范围 */}
        <div className="absolute" style={{ top: -6, left: -12 }}>
          <Selection update_thumbnial_indicator={update_thumbnial_indicator} />
        </div>
      </div>
    </div>
  )
})

export default ProgressBar

import { makeAutoObservable } from "mobx"
import Store from ".."

// 前后各预览20帧
const PreviewFramesRange = 20
export default class Player {
  root: Store
  player: HTMLVideoElement | null
  singleFrameDuration: number //ms
  fps: number = 30
  percent = 0 //
  paused: boolean = true
  currentTime: number = 0
  currentFrame: number = 0
  totalFrames: number = 0
  fragments: [number, number][] = [] // video loaded fragments : [begin, end], second
  aspectRatio: number = 1
  thumbNailVideo: HTMLVideoElement | null = null
  frameUrl: { [key: number]: string } = [] // cache the url of each frame, key: frame number
  previewFrames: number[] = [] // frame of previews
  // isSelect: boolean = true // whether if is creaing time range on progress bar

  constructor(root: Store, fps: number) {
    makeAutoObservable(this)
    this.root = root
    this.player = null
    this.fps = fps
    this.singleFrameDuration = (1 / fps) * 1000 // ms
  }

  setPlayer(player: HTMLVideoElement) {
    this.player = player
  }

  setPercent(p: number) {
    this.percent = p
  }

  play() {
    this.player?.play()
    this.paused = false
  }

  pause() {
    this.player?.pause()
    this.paused = true
  }

  jumpto(frameNum: number) {
    const millisecs = frameNum * this.singleFrameDuration
    this.player && (this.player.currentTime = millisecs / 1000)
  }

  forward(frameBy: number) {
    if (!this.player) return
    let millisecs = Number(
      (
        this.player.currentTime * 1000 +
        frameBy * this.singleFrameDuration
      ).toFixed(0)
    )
    millisecs =
      millisecs > this.player.duration * 1000 ? this.player.duration : millisecs
    this.player.currentTime = millisecs / 1000
  }

  backward(frameBy: number) {
    if (!this.player) return
    let millisecs = Number(
      (
        this.player.currentTime * 1000 -
        frameBy * this.singleFrameDuration
      ).toFixed(0)
    )
    millisecs = millisecs < 0 ? 0 : millisecs
    this.player.currentTime = millisecs / 1000
  }

  setCurrentFrame(frame: number) {
    this.currentFrame = frame
  }

  setTotalFrames(frames: number) {
    this.totalFrames = Math.ceil(frames)
  }

  setCurrentTime(time: number) {
    this.currentTime = time
  }

  setFragments(frags: [number, number][]) {
    this.fragments = frags
  }

  setAspectRatio(ratio: number) {
    this.aspectRatio = ratio
  }

  setThumbNailVideo(element: HTMLVideoElement) {
    this.thumbNailVideo = element
  }

  timeToFrame = (time: number) => {
    const cf = Number(((time * 1000) / this.singleFrameDuration).toFixed(0))
    return cf
  }

  frameTotime = (frame: number) => {
    const ct = (frame * this.singleFrameDuration) / 1000
    return ct
  }

  setFrameUrl(frame: number, url: string) {
    this.frameUrl[frame] = url
  }

  getFrameUrl(frame: number) {
    return this.frameUrl[frame]
  }

  openPreiews(frame: number) {
    this.pause()

    let frames: number[] = [frame]
    for (let i = 1; i <= PreviewFramesRange / 2; i++) {
      let prev = frame - i
      let next = frame + i

      if (prev >= 0) {
        frames.unshift(prev)
      }

      if (next <= this.totalFrames) {
        frames.push(next)
      }
    }

    this.previewFrames = frames
  }

  closePreviews() {
    this.previewFrames = []
  }
}

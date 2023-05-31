import { observer } from "mobx-react-lite"
import { useContext, useEffect, useRef } from "react"
import { Update_Thumbnial_Indicator } from ".."
import { EditorContext, SideBarWidth } from "../../../../.."
import { FaGripVertical } from "react-icons/fa"

export default observer(
  (props: { update_thumbnial_indicator: Update_Thumbnial_Indicator }) => {
    const {
      store: { player, current, group },
    } = useContext(EditorContext)

    if (!current.isSelected || !player.player) return null

    const totalWidth =
      document.getElementById("progressBarWrapper")!.getBoundingClientRect()
        .width - 24

    const initialLeft = (current.range[0] / player.totalFrames) * totalWidth
    const initialWidth =
      ((current.range[1] - current.range[0]) / player.totalFrames) * totalWidth

    /**
     * 设置时间选择范围
     * @param x1 left to the container leftside
     * @param x2 end point ,  x1 + width px
     */
    const setTimeRange: SetTimeRange = (x1, x2) => {
      let beginFrame = Math.ceil((x1 / totalWidth) * player.totalFrames)
      let endFrame = Math.ceil((x2 / totalWidth) * player.totalFrames)

      current.setRange([beginFrame, endFrame])

      // update time range of current group
      group.update({ range: [beginFrame, endFrame] })
    }

    return (
      <Selection
        initialLeft={initialLeft}
        initialWidth={initialWidth}
        setTimeRange={setTimeRange}
        update_thumbnial_indicator={props.update_thumbnial_indicator}
      />
    )
  }
)

type SetTimeRange = (x1: number, x2: number) => void
const Selection = (props: {
  initialLeft: number
  initialWidth: number
  setTimeRange: SetTimeRange
  update_thumbnial_indicator: Update_Thumbnial_Indicator
}) => {
  // const [initialLeft] = useState(props.initialLeft)
  // const [initialWidth] = useState(props.initialWidth)

  const selectionRef = useRef<HTMLDivElement>(null!)
  const leftRef = useRef<HTMLDivElement>(null!)
  const rightRef = useRef<HTMLDivElement>(null!)

  // update the position of selection when user click "open selection" button
  useEffect(() => {
    selectionRef.current.style.left = props.initialLeft + "px"
    selectionRef.current.style.width = props.initialWidth + 24 + "px"
  }, [props.initialLeft, props.initialWidth])

  // event listening
  useEffect(() => {
    let isLeft = false
    let isRight = false
    let initialWidth = 0
    let initialClientX = 0
    let initialContainerLeft = 0

    // record initial state
    const inital = (left: boolean, clientX: number) => {
      isLeft = left
      isRight = !left
      initialContainerLeft =
        selectionRef.current.getBoundingClientRect().x - SideBarWidth // 用于计算更新左端点时 选择框的left偏移量
      initialWidth = selectionRef.current.getBoundingClientRect().width
      initialClientX = clientX // 用于计算鼠标横向偏移量
    }

    // left press down
    const handleLeftMouseDown = (e: MouseEvent) => {
      inital(true, e.clientX)
    }

    // right press down
    const handleRightMouseDown = (e: MouseEvent) => {
      inital(false, e.clientX)
    }

    // mouseup clear
    const handleMouseUp = () => {
      isLeft = false
      isRight = false
      let { x, width } = selectionRef.current.getBoundingClientRect()
      x = x - SideBarWidth
      // 更新时间范围
      props.setTimeRange(x, x + width - 24)
    }

    // 监听左右拖拽移动
    const handleProgressBarMove = (event: MouseEvent) => {
      if (event.buttons === 1) {
        let delta = event.clientX - initialClientX

        if (isLeft) {
          let width = initialWidth - delta

          // 左右边框一共 24px
          if (width >= 24 && initialContainerLeft + delta >= 0) {
            selectionRef.current.style.left = `${
              initialContainerLeft + delta
            }px`
            selectionRef.current.style.width = width + "px" // -4 的原因还没查明
            props.update_thumbnial_indicator(initialContainerLeft + delta)
          }
        }

        if (isRight) {
          const totalWidth = document
            .getElementById("progressBarWrapper")!
            .getBoundingClientRect().width
          let left =
            selectionRef.current.getBoundingClientRect().x - SideBarWidth
          let width = initialWidth + delta
          let valid = width + left <= totalWidth
          // console.log(width, left, totalWidth)
          if (width >= 24 && valid) {
            selectionRef.current.style.width = width + "px"
            props.update_thumbnial_indicator(left + width - 24)
          }
        }
      }
    }

    const handlerStopPropagation = (e: MouseEvent) => {
      e.stopPropagation()
    }

    const leftHold = leftRef.current
    const rightHold = rightRef.current

    leftHold.addEventListener("mousedown", handleLeftMouseDown)
    rightHold.addEventListener("mousedown", handleRightMouseDown)
    leftHold.addEventListener("click", handlerStopPropagation)
    rightHold.addEventListener("click", handlerStopPropagation)
    window.document.body.addEventListener("mouseup", handleMouseUp)
    document
      .getElementById("player")!
      .addEventListener("mousemove", handleProgressBarMove)

    return () => {
      leftHold.removeEventListener("mousedown", handleLeftMouseDown)
      rightHold.removeEventListener("mousedown", handleRightMouseDown)
      leftHold.removeEventListener("click", handlerStopPropagation)
      rightHold.removeEventListener("click", handlerStopPropagation)
      window.document.body.removeEventListener("mouseup", handleMouseUp)
      document
        .getElementById("player")!
        .removeEventListener("mousemove", handleProgressBarMove)
    }
  }, [props.initialLeft, props.initialWidth])

  return (
    <div
      ref={selectionRef}
      style={{
        left: 0,
        height: 24,
        backgroundColor: "rgb(0 128 0 / 50%)",
        border: "1px solid green",
        opacity: 0.5,
        borderLeftWidth: "12px",
        borderRightWidth: "12px",
        borderRadius: 3,
        width: 0 + 24,
        lineHeight: "28px",
      }}
      className="relative"
    >
      <div
        className="absolute top-0 cursor-pointer flex justify-center flex-col"
        style={{
          height: 24,
          width: 12,
          left: -12,
          color: "#5bc229",
          cursor: "ew-resize",
        }}
        ref={leftRef}
      >
        <FaGripVertical className="text-xs " />
      </div>

      <div
        className="absolute top-0 cursor-pointer flex justify-center flex-col"
        style={{
          height: 24,
          width: 12,
          right: -12,
          color: "#5bc229",
          cursor: "ew-resize",
        }}
        ref={rightRef}
      >
        <FaGripVertical className="text-xs " />
      </div>
    </div>
  )
}

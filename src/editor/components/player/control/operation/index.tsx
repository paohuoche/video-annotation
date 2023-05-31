// import { Space } from 'antd'

import { PlayOperationHeight } from "../../../.."
import CreateRange from "./createRange"
import Backward from "./jumpFrame/backward"
import Forward from "./jumpFrame/forward"
import Next from "./labeledFrame/next"
import Previous from "./labeledFrame/previous"
import Play from "./play"
import Preview from "./preview"
import Speed from "./speed"
import TimeLine from "./timeLine"

const Operation = () => {
  return (
    <div
      className="flex justify-between items-center"
      style={{ height: PlayOperationHeight, paddingLeft: 12, paddingRight: 12 }}
    >
      {/* set selection */}
      <div className="flex space-x-6 basis-48 text-white">
        <CreateRange />

        <Preview />
      </div>

      <div className="flex space-x-6 grow justify-center text-white">
        {/* 首帧标注 */}
        {/* <Begin /> */}

        {/* 上一个已标注帧 */}
        <Previous />

        {/* 尾帧标注 */}
        {/* <End /> */}

        {/* 向前10帧 */}
        <Backward />

        {/* 播放 / 暂停 */}
        <Play />

        {/* 向后10帧 */}
        <Forward />

        {/* 下一个已标注帧 */}
        <Next />
      </div>

      <div className="flex space-x-6 basis-48 justify-end items-center text-white">
        {/* 进度显示 */}
        <TimeLine />

        {/* 播放倍速 */}
        <Speed />
      </div>
    </div>
  )
}

export default Operation

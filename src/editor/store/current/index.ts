import { computed, makeAutoObservable } from "mobx"
import RootStore from ".."
import { CurrentType } from "./types"
import { GroupTypes } from "../group/types"
import { ShapeTypes } from "../indes.types"
// import { ShapeTypes } from './types/base'
// import { CurrentType } from './types/current'
// import { GroupTypes } from './types/group'

// initial value
const defaultShape: CurrentType.Shape = null
const defaultRange: CurrentType.Range = [-1, -1]
const defaultGroupId: GroupTypes.GroupId = ""
const defaultClassification: CurrentType.Classification = ""
// const defaultCurrentFrame = 0
const defaultShapeId = ""
class Current {
  root: RootStore

  // 当前操作的图形类型
  shapeType = defaultShape

  // 选择的时间框范围
  range = defaultRange

  // group of operating currently
  groupId = defaultGroupId

  // current selected classification
  classification = defaultClassification

  //
  // currentFrame = defaultCurrentFrame

  shapeId = defaultShapeId

  constructor(root: RootStore) {
    makeAutoObservable(this, {
      isSelected: computed,
    })
    this.root = root
  }

  // whether if displaying a time range picker now
  get isSelected() {
    return this.root.current.range[0] !== -1
  }

  setShapeType(s: ShapeTypes | null) {
    this.shapeType = s
  }

  /**
   * set the time range of selection on progress bar
   * @param range [begin, end]
   */
  setRange(range: CurrentType.Range) {
    // console.log('set', range)
    this.range = range
  }

  /**
   * set the current groupId of operating
   * @param id
   */
  setGroup(id: string) {
    this.groupId = id
  }

  setClass(c: string) {
    this.classification = c
  }

  // setCurrentFrame(frame: number) {
  //   this.currentFrame = frame
  // }

  setShapeId(id: string) {
    this.shapeId = id
  }

  /**
   * clear all the current variable of status
   */
  clear() {
    this.setShapeType(defaultShape)
    this.setRange(defaultRange)
    this.setClass(defaultClassification)
    this.setGroup(defaultGroupId)
    this.setShapeId("")
  }

  clearSelectedShape() {
    this.setShapeId("")
  }

  clearShapeType() {
    this.setShapeType(defaultShape)
  }
}

export default Current

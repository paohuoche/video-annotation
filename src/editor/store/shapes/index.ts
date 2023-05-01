// import { UndoData } from 'components/DAS/Editor/Component/Editor/Editor.types'
import { makeAutoObservable } from "mobx"
import RootStore from ".."
// import { prelabelData } from './prelabel-data'
import { Frame } from "../indes.types"
import { ShapesType } from "./types"

const initalData: ShapesType.ShapeManual = {}
const initialPrelabel: ShapesType.PrelabelShape = {}

class Shapes {
  root: RootStore
  // 图形数据 (相对于图形左上角的，未缩放的真实数据)
  shapes = initalData

  prelabel = initialPrelabel

  // 撤销数据
  // undoData: UndoData[] = []

  constructor(root: RootStore) {
    makeAutoObservable(this, {
      // drawer: computed
    })
    this.root = root
  }

  clear() {
    this.shapes = initalData
    this.prelabel = initialPrelabel
  }

  add(params: ShapesType.Params.Add, classification: string) {
    const data = this.shapes
    const { frame, groupId, value } = params
    !data[groupId] && (data[groupId] = {})
    !data[groupId][frame] && (data[groupId][frame] = {})
    data[groupId][frame][value.shapeId] = {
      groupId,
      classification,
      id: value.shapeId,
      frame: params.frame,
    }
    // this.root.group.group[groupId].frames.add(frame)
    this.root.group.addFrame(frame, groupId)
    // this.root.group.group[groupId].classification = classification
  }

  delete(params: ShapesType.Params.Delete) {
    const { frame, groupId, shapeId } = params
    delete this.shapes[groupId][frame]?.[shapeId]
    if (
      this.shapes[groupId][frame] &&
      Object.keys(this.shapes[groupId][frame]).length === 0
    ) {
      // this.root.group.group[groupId].frames.delete(frame)
      this.root.group.deleteFrame(frame)
    }
  }

  get(params: { groupId: string; frame: number }) {
    return this.shapes[params.groupId]?.[params.frame] || {}
  }

  // update(params: ShapesType.Params.Update) {
  //   console.log(params)
  //   this.shapes[params.groupId][params.frame][params.value.shapeId].value = {
  //     ...this.shapes[params.groupId][params.frame][params.value.shapeId].value,
  //     ...params.value
  //   }
  // }

  /**
   * delete the shape of prelabel
   */
  // prelabel_delete(params: ShapesType.Params.PrelabelDelete) {
  //   delete this.prelabel[params.frame][params.shapeId]
  // }

  // /**
  //  * update the shape of prelabel
  //  */
  // prelabel_update(params: ShapesType.Params.PrelabelUpdate) {
  //   this.prelabel[params.frame][params.value.id].value = params.value
  // }

  /**
   * assoiate shapes of followed frame until the end of time range
   * shapeId: the id of shape that need to be assoiated
   */
  // associate() {
  //   const currentFrame = this.root.player.currentFrame
  //   const endFrame = this.root.current.range[1]
  //   const classification = this.root.current.classification
  //   const groupId = this.root.current.groupId
  //   const shapeId = Object.keys(this.shapes[groupId]?.[currentFrame] || {})[0] // choose the id of only existed shape at the frame in the group
  //   const prelabel = this.prelabel
  //   if (groupId && shapeId && classification) {
  //     const color = this.root.label.label[classification].color
  //     for (let cf = currentFrame + 1; cf <= endFrame; cf++) {
  //       if (prelabel[cf]?.[shapeId]) {
  //         this.add(
  //           {
  //             frame: cf,
  //             groupId,
  //             value: {
  //               ...prelabel[cf][shapeId].value,
  //               color,
  //               text: classification,
  //               meta: {
  //                 ...prelabel[cf][shapeId].value.meta,
  //                 prelabel: false
  //               }
  //             }
  //           },
  //           classification
  //         )
  //         prelabel[cf][shapeId].value.meta.prelabel = false
  //       }
  //     }
  //     this.root.current.setShapeId('')
  //   }
  // }

  /**
   * unassociate the shapes that have been classifled into current group from current frame until the range[1], the shapes with same id,
   */
  // unassociate() {
  //   const currentFrame = this.root.current.currentFrame
  //   const endFrame = this.root.current.range[1]
  //   const groupId = this.root.current.groupId
  //   const shapeId = Object.keys(this.shapes[groupId]?.[currentFrame] || {})[0]
  //   const prelabel = this.prelabel

  //   if (groupId && shapeId) {
  //     for (let cf = currentFrame; cf <= endFrame; cf++) {
  //       this.delete({
  //         frame: cf,
  //         groupId,
  //         shapeId
  //       })

  //       if (prelabel[cf]?.[shapeId]) {
  //         prelabel[cf][shapeId].value.meta.prelabel = true
  //       }
  //       // }
  //     }
  //     this.root.current.setShapeId('')
  //   }
  // }

  /**
   * clear the manual annotation data of specific frame
   */
  clearFrame(groupId: string, cf: Frame) {
    if (!this.shapes[groupId]?.[cf]) return

    delete this.shapes[groupId][cf]
    this.root.group.group[groupId].frames.order.delete(cf)
    this.root.group.group[groupId].frames.set.delete(cf)

    // if (this.prelabel[cf]) {
    //   for (let shapeId in this.prelabel[cf]) {
    //     this.prelabel[cf][shapeId].value.meta.prelabel = true
    //   }
    // }
  }
}

export default Shapes

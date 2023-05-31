import { makeAutoObservable, toJS } from "mobx"
import { v4 as uuidv4 } from "uuid"

// import { ServerFile } from '../../../ImageAnnotation/query/index.types'
import { Frame } from "../indes.types"
import { GroupTypes } from "./types"
import SortedArray from "./SortedArray"
import Store from ".."
import { ShapesType } from "../shapes/types"

const group: GroupTypes.Group = {}
const groupOrder: GroupTypes.GroupOrder = new Set()
class Group {
  root: Store

  // groupId: string
  group = group

  // order of group
  groupOrder = groupOrder

  constructor(root: Store) {
    makeAutoObservable(this)
    this.root = root
  }

  /**
   * initial data of group from server data
   */
  // initial(params: {
  //   groups: { [groupId: string]: ServerFile.ServerFileResponse['groupResponses'][number] }
  //   shapes: { [shapeId: string]: ServerFile.ServerFileResponse['objectResponses'][number] }
  // }) {
  //   for (let groupId in params.groups) {
  //     const group = params.groups[groupId]
  //     /**
  //      * attributes
  //      */
  //     let attributes: GroupTypes.Value['attributes'] = {}
  //     let startFrame = -1
  //     let endFrame = -1

  //     group.labels?.forEach(lbl => {
  //       if (lbl.name === 'startFrame') {
  //         startFrame = Number(lbl.values[0])
  //       } else if (lbl.name === 'endFrame') {
  //         endFrame = Number(lbl.values[0])
  //       } else {
  //         attributes[lbl.name] = lbl.values[0]
  //       }
  //     })

  //     /**
  //      * frames info
  //      */
  //     let order = new SortedArray([])
  //     group.boxes.forEach(shapeId => {
  //       order.insert(Number(params.shapes[shapeId].frameId))
  //     })

  //     this.add({
  //       id: group.id,
  //       range: [startFrame, endFrame],
  //       classification: group.name,
  //       frames: {
  //         order,
  //         set: new Set(order.ary)
  //       },
  //       attributes
  //     })
  //   }
  // }

  get(gid: string) {
    return this.group[gid]
  }

  getShapes(gid: string) {
    const { frames } = this.get(gid)
    const framesId = Array.from(frames.set)
    let shapes: ShapesType.Value[] = []

    framesId.forEach((frame) => {
      const _shapes = Object.values(
        this.root.shapes.get({
          groupId: gid,
          frame,
        })
      )
      shapes = shapes.concat(_shapes)
    })

    return shapes
  }

  /**
   * clear the group data
   */
  clear() {
    this.group = group
    this.groupOrder = new Set()
  }

  /**
   * create group manually
   */
  add(params: {
    id?: string
    range: [Frame, Frame]
    classification?: string
    frames?: {
      order?: SortedArray
      set?: Set<number>
    }
    // attributes?: GroupTypes.Value['attributes']
  }) {
    const c = params.classification
    const newGroup: GroupTypes.Value = {
      id: params.id || uuidv4(),
      range: params.range,
      // classification: c || "",
      frames: {
        order: params.frames?.order || new SortedArray([]),
        index: -1,
        set: params.frames?.set || new Set(),
      },
      // attributes: params.attributes || {}
    }

    this.group[newGroup.id] = newGroup

    this.groupOrder.add(newGroup.id)

    return newGroup
    // this.root.current.setGroup(newGroup.id)
    // this.root.current.setRange(newGroup.range)
  }

  /**
   * 添加组
   * @param groupId
   */
  // add(group: GroupTypes.Value) {
  //   this.group[group.id] = group
  //   this.groupOrder.add(group.id)
  // }

  /**
   * delete group
   */
  delete(gid: string) {
    delete this.group[gid]
    this.groupOrder.delete(gid)
    delete this.root.shapes.shapes[gid]
    this.root.current.clear()
  }

  /**
   * update group info
   * @param gid
   * @param group
   */
  update(groupConfig: Partial<GroupTypes.Value>) {
    let gid = this.root.current.groupId
    let config = this.group[gid]
    this.group[gid] = { ...config, ...groupConfig }
  }

  /**
   * highligths selected group
   * @param gid
   */
  focus(gid: GroupTypes.GroupId) {
    let group = this.group[gid]
    this.root.current.setGroup(group.id)
    this.root.current.setRange(group.range)
  }

  /**
   * switch the class of current group
   * @param classification target classification
   * @param groupId  id of group that be modified in classs
   * @param color  color target classification
   * @returns
   */
  // switchGroupClass(classification: string, groupId: string, color: string) {
  // if (this.group[groupId].classification === classification) return

  // this.group[groupId].classification = classification
  // this.group[groupId].attributes = {}

  /**
   * update color and text of shapes that belong to this group
   */
  // for (let frame of this.group[groupId].frames.order.ary) {
  //   for (let id in this.root.shapes.shapes[groupId][Number(frame)]) {
  //     this.root.frames.update({
  //       frame: Number(frame),
  //       groupId,
  //       value: {
  //         ...this.root.shapes.shapes[groupId][Number(frame)][id].value,
  //         color,
  //         text: classification
  //       }
  //     })
  //   }
  // }
  // }

  /**
   * set the attributes of group
   * @param params
   */
  // setAttr(params: { groupId: string; attr: GroupTypes.Params.SetAttr }) {
  //   const { groupId, attr } = params
  //   let attributes = this.group[groupId].attributes
  //   this.group[groupId].attributes = {
  //     ...attributes,
  //     [attr.name]: attr.value
  //   }
  // }

  /**
   * record the frame number of new shape located
   */
  addFrame(frame: number, groupId: string) {
    let currentGroup = this.group[groupId]
    currentGroup.frames.order.insert(frame)
    currentGroup.frames.set.add(frame)
  }

  /**
   * delete the frame that no shapes existed on that
   */
  deleteFrame(frame: number) {
    let currentGroup = this.group[this.root.current.groupId]
    currentGroup.frames.order.delete(frame)
    currentGroup.frames.set.delete(frame)
  }
}

export default Group

import { Frame } from "../indes.types"
import SortedArray from "./SortedArray"

export namespace GroupTypes {
  /**
   * thei value of single group data
   */
  export type Value = {
    id: string
    range: [Frame, Frame]
    // classification: string
    frames: {
      order: SortedArray
      set: Set<number>
      index: number
    } // // // 在哪些帧上有数据
    // attributes?: {
    //   [name: string]: string // attribute name -> attribute value
    // }
  }

  export type GroupId = string //
  /**
   * the structure of group data
   */
  export type Group = {
    [groupId: GroupId]: Value
  }

  export type GroupOrder = Set<string>

  // export namespace Params {
  //   export type Created = {
  //     groupId: string
  //     classification: string
  //     shapeType: ShapeTypes
  //   }

  //   /**
  //    * specify the attribute of group
  //    */
  //   export type SetAttr = {
  //     name: string
  //     value: string
  //   }
  // }
}

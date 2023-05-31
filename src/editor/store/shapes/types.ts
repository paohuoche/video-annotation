import { ShapeId } from "../indes.types"
// import { NewShape } from '@ai2/drawer/dist/Drawer/index.types'

// import { NewShape } from '@ai2/drawer/dist/Drawer/index.types'

export namespace ShapesType {
  // export type NewShape = Rectangle | Point
  export type Value = {
    id: string
    classification: string
    groupId: string
    frame: number
  }
  export interface FrameShapes {
    [shapeId: string]: Value
  }

  /**
   * shape store of manual label
   */
  export interface ShapeManual {
    [groupId: string]: {
      [frame: number]: FrameShapes
    }
  }

  /**
   * shape store of prelabel
   */
  export interface PrelabelShape {
    [frame: number]: {
      [shapeId: string]: {
        value: Value
      }
    }
  }
  export namespace Params {
    /**
     * params of add shape
     */
    export type Add = {
      frame: number
      groupId: string
      value: Value & { shapeId: string }
    }

    /**
     * params of update shape
     */
    export type Update = {
      frame: number
      groupId: string
      value: Value & { shapeId: string }
    }

    /**
     * params of delete shape group
     */
    export type Delete = {
      frame: number
      groupId: string
      shapeId: string
    }

    /**
     * params of delete prelabe shape
     */
    export type PrelabelDelete = {
      frame: number
      shapeId: string
    }

    export type PrelabelUpdate = {
      frame: number

      value: Value
    }
  }
}

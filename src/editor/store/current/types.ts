import { Frame, ShapeTypes } from "../indes.types"

export namespace CurrentType {
  // export type Frames = ShapeTypes
  export type Shape = ShapeTypes | null

  export type Range = [Frame, Frame]

  export type Classification = string
}

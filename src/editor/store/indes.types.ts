import { RectangleValue } from "@paohuoche/react-drawing-library/dist/types/shapes/rectangle/Rectangle.types"
import { PointValue } from "@paohuoche/react-drawing-library/dist/types/shapes/Point/Point.types"

/**
 * number of frame
 */
export type Frame = number

/**
 * seconds
 */
// export type Sec = number

/**
 * type of coordinates
 */
export type Coord = {
  x: number
  y: number
}

export type ShapeId = string

/**
 * enum supported shapes
 */
export declare enum ESupportShape {
  Rectangle = 0,
  Point = 4,
  // Poi = 4
}

export enum EShapeCN {
  Rectangle = "矩形",
  Point = "点",
}

/**
 * shape types
 */
export declare type ShapeTypes = RectangleValue["type"] | PointValue["type"]

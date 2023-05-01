import { makeAutoObservable } from "mobx"
import Current from "./current"
import Shapes from "./shapes"
import Group from "./group"
import Labels from "./labels"
import Player from "./player"
class Store {
  current: Current
  shapes: Shapes
  group: Group
  labels: Labels
  player: Player

  constructor(fps: number) {
    makeAutoObservable(this)
    this.current = new Current(this)
    this.shapes = new Shapes(this)
    this.group = new Group(this)
    this.labels = new Labels(this)
    this.player = new Player(this, fps)
  }
}

export default Store

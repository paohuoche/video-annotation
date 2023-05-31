import { makeAutoObservable } from "mobx"
import Store from ".."
import { LabelTypes } from "./types"

class Labels {
  root: Store

  value: LabelTypes.Label | null = null

  constructor(root: Store) {
    makeAutoObservable(this)
    this.root = root
  }

  setLabel(value: LabelTypes.Label) {
    this.value = value
  }

  clear() {
    this.value = null
  }
}

export default Labels

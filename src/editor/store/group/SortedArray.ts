export class SortedArray {
  ary: number[]
  constructor(initialAry: number[]) {
    this.ary = initialAry
  }

  length() {
    return this.ary.length
  }

  search(target: number) {
    let left = 0
    let right = this.ary.length - 1
    let pos = -1
    while (left <= right) {
      let mid = Math.floor((left + right) / 2)
      if (this.ary[mid] === target) {
        return { left: mid + 1, right: mid - 1, pos: mid }
      } else if (target > this.ary[mid]) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
    return { left, right, pos }
  }

  /**
   * return the index of target element
   * @param target
   * @returns
   */
  findIndex(target: number) {
    const { pos } = this.search(target)
    return pos
  }

  /**
   * return the index of the first element larger then target or equal the target
   * @param target
   * @returns
   */
  largerIndex(target: number) {
    return this.search(target).left
  }

  /**
   * return the index of latest element smaller than the target or equal the target
   * @param target
   * @returns
   */
  smallerIndex(target: number) {
    return this.search(target).right
  }

  /**
   * the next sibling element of target
   * @param frame: current frame
   */
  nextElement(frame: number) {
    // if (this.length() === 0) return

    const index = this.largerIndex(frame)
    if (index > this.length() - 1) {
      return this.ary[this.length() - 1]
    } else {
      return this.ary[index]
    }
  }

  /**
   * the previous sibling element of target
   * @param frame: current frame
   */
  previousElement(frame: number) {
    // if (this.length() === 0) return

    const index = this.smallerIndex(frame)
    if (index < 0) {
      return this.ary[0]
    } else {
      return this.ary[index]
    }
  }

  insert(target: number) {
    const index = this.largerIndex(target)
    this.ary = [...this.ary.slice(0, index), target, ...this.ary.slice(index)]
  }

  delete(target: number) {
    const index = this.findIndex(target)
    if (index === -1) return
    this.ary = [...this.ary.slice(0, index), ...this.ary.slice(index + 1)]
  }
}

export default SortedArray

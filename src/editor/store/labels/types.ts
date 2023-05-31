export namespace LabelTypes {
  export type Value = {
    color: string
    classification: string
  }

  export type Label = {
    [classification: string]: Value
  }
}

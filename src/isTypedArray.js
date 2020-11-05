// https://tc39.es/ecma262/#sec-get-%typedarray%.prototype-@@tostringtag
const toStringTag = Object.getOwnPropertyDescriptor(
  Object.getPrototypeOf(Int8Array.prototype),
  Symbol.toStringTag
).get

const isArrayBufferView = ArrayBuffer.isView

const isTypedArray = value => toStringTag.call(value) !== undefined

export default isTypedArray

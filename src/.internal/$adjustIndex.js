// adjustIndex :: Number -> Number -> Number
const $adjustIndex = (idx, len) =>
  idx < 0 ? Math.max(len + idx, 0) : Math.min(idx, len)

export default $adjustIndex

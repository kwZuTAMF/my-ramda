// https://tc39.es/ecma262/#sec-tolength
const $isLength = value =>
  typeof value === 'number' &&
  value >= 0 &&
  value <= 9007199254740991 &&
  value % 1 === 0

export default $isLength

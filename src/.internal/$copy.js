import type from '../type'

const $copy = value => {
  if (!value || typeof value !== 'object') {
    return value
  }

  switch (type(value)) {
    case 'Boolean':
    case 'Number':
    case 'BigInt':
    case 'String':
    case 'Symbol':
    case 'Date':
      return new value.constructor(value.valueOf())
    case 'RegExp':
      return Object.assign(new RegExp(value), { lastIndex: value.lastIndex })
    case 'Array':
      return value.slice()
    case 'Object':
      return { ...value }
    default:
      return value
  }
}

export default $copy

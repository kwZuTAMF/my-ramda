import type from '../type'

const { assign, create, getPrototypeOf } = Object

const $deepCopy = value => {
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
      return assign(new RegExp(value), { lastIndex: value.lastIndex })
    case 'Array':
      return value.map($deepCopy)
    case 'Object':
      return Reflect.ownKeys(value).reduce(
        (acc, key) => ((acc[key] = $deepCopy(value[key])), acc),
        create(getPrototypeOf(value))
      )
    default:
      return value
  }
}

export default $deepCopy

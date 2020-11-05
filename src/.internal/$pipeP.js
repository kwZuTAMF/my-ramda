const $pipeP = (f, g) => (...args) => f(...args).then(g)

export default $pipeP

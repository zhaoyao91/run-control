const ParallelThrottle = require('parallel-throttle')

module.exports = function (maxTasksInParallel) {
  return function wrap (fn) {
    const throttle = new ParallelThrottle({
      maxTasksInParallel
    })
    return function (options) {
      return throttle.add(() => fn(options))
    }
  }
}
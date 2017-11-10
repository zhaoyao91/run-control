const RateThrottle = require('promise-throttle')

module.exports = function (requestsPerSecond) {
  return function wrap (fn) {
    const throttle = new RateThrottle({
      requestsPerSecond,
      promiseImplementation: Promise,
    })
    return function (options) {
      return throttle.add(() => fn(options))
    }
  }
}
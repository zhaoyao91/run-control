module.exports = function compose (...fs) {
  return function wrap (target) {
    return fs.reduceRight((target, func) => func(target), target)
  }
}

/**
 * 
 * @param {合并的目标对象}} target 
 * @returns 
 */
export default function (target) {
  // eslint-disable-next-line no-debugger
  for (let i = 1; i < arguments.length; i++) {
    let source = arguments[i] || {}
    for (let key in source) {
      // eslint-disable-next-line no-prototype-builtins
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        let value = source[key]
        if (value !== undefined) {
          target[key] = value
        }
      }
    }
  }
  return target
}
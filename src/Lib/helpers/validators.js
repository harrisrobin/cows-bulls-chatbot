export default (() => {
  return {
    isNumber: value => Number.isInteger(value),
    isString: value => typeof value === "string",
    maxLength: length => value => value.length <= length,
    minLength: length => value => value.length >= length
  }
})()

/**
 *
 * @param {Object to check} object
 * @param {List of properties} propertyArray
 */
function hasAllOptions(object, propertyArray) {
  if (typeof object === 'undefined' || !Array.isArray(propertyArray))
    return false

  for (let property of propertyArray) {
    if (typeof object[property] === 'undefined') return false
  }

  return true
}

module.exports = hasAllOptions

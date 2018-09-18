const snakeCase = require('lodash.snakecase')
const camelCase = require('lodash.camelcase')
const pgArray = require('postgres-array')

const isDate = (value) => {
  return Object.prototype.toString.call(value) === '[object Date]'
}

const formatRow = interceptor => row => {
  let keys = Object.keys(row)

  return keys.reduce((acc, key) => {
    let field = camelCase(key)
    let value = row[key]
    if (typeof value === 'string' && /^\{.*\}$/g.test(value)) {
      value = pgArray.parse(value)
    }
    if (isDate(td)) {
      value = value.toISOString()
    }
    let tapped = interceptor(key, value)
    if (tapped) {
      field = tapped[0]
      value = tapped[1]
    }
    acc[field] = value
    return acc
  }, {})
}

const format = (data, options = {}) => {
  const interceptor = options.interceptor || function() {}
  const head = options.head || false
  const useCamelCase = options.camelCase || true

  const { rows } = data

  if (!useCamelCase) {
    return (head && rows && rows.length)
      ? rows[0]
      : rows
  }

  if (rows && rows.length) {
    rows = rows.map(formatRow(interceptor))
    return head && rows.length ? rows[0] : rows
  }
  return head ? null : []
}

module.exports = format

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
    let td = row[key]
    if (typeof td === 'string' && /^\{.*\}$/g.test(td)) {
      td = pgArray.parse(td)
    }
    if (isDate(td)) {
      td = td.toISOString()
    }
    let tapped = interceptor(key, value)
    if (tapped) {
      field = tapped[0]
      td = tapped[1]
    }
    acc[field] = td
    return acc
  }, {})
}

const format = (data, options = {}) => {
  const interceptor = options.interceptor || function() {}
  const head = options.head || false
  const { rows } = data
  if (rows && rows.length) {
    rows = rows.map(formatRow(interceptor))
    return head && rows.length === 1 ? rows[0] : rows
  }
  return head ? null : []
}

module.exports = format

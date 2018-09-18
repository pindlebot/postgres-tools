const snakeCase = require('lodash.snakecase')

const where = (params) => {
  const command = Object.keys(params).map(key => {
    let field = snakeCase(key)
    if (Array.isArray(params[key])) {
      return `${field} && '{${params[key]}}'`
    }
    return `${field} = '${params[key]}'`
  }).join(' AND ')
  return `WHERE ${command}`
}

module.exports = where


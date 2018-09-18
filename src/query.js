const checkout = require('./checkout')
const format = require('./format')

const defaultOptions = {
  camelCase: true,
  head: false,
  pool: {},
  values: []
}

const query = async (...args) => {
  let [command, options = defaultOptions] = args
  const client = await checkout(options.pool || {})
  const data = await client.query(command, options.values || [])
    .catch(error => {
      throw error
    })

  return format(data, options)
}

module.exports = query

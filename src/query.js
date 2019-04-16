const checkout = require('./checkout')
const format = require('./format')

const defaultOptions = {
  camelCase: true,
  head: false,
  pool: {},
  values: []
}

const query = async (command, values = [], options = defaultOptions) => {
  const client = await checkout(options.pool || {})
  let data
  try {
    data = await client.query(command, values)
  } catch (err) {
    throw err
  }

  return format(data, options)
}

module.exports = query

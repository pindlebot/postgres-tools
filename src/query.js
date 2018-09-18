const checkout = require('./checkout')
const format = require('./format')

const defaultOptions = {
  camelCase: true,
  head: false
}

const query = async (...args) => {
  let [command, values = [], options = defaultOptions] = args
  if (values && !Array.isArray(values) && typeof values === 'object') {
    options = values
  }

  const client = await checkout(options)
  const data = await client.query(command, values)
    .catch(error => {
      throw error
    })

  return format(data, options)
}

module.exports = query

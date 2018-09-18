const checkout = require('./checkout')
const format = require('./format')

const query = async (...args) => {
  const options = args.find(arg => typeof arg === 'object' && !Array.isArray(arg))
  const client = await checkout(options || {})
  const data = await client.query(...args)
    .catch(error => {
      throw error
    })
  return format(data)
}

module.exports = query

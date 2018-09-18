const checkout = require('./checkout')
const format = require('./format')

const query = async (...args) => {
  const client = await checkout()
  const data = await client.query(...args)
    .catch(error => {
      throw error
    })
  return format(data)
}

module.exports = query

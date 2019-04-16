const query = require('./query')

const head = async (...args) => {
  const results = await query(...args)
  return results && results.length ? results[0] : results
}

module.exports = head

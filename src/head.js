const query = require('./query')

module.exports.head = async (...args) => {
  const results = await query(...args)
  return results && results.length ? results[0] : results
}

const Pool = require('pg-pool')

let pool
let client

const checkout = async (options = {}) => {
  const log = options.log || function() {}
  if (client) {
    if ((client._connected || client._connecting) && !client._ending) {
      return client
    }
  }

  if (!pool) {
    pool = new Pool(options)
    pool.on('error', options.log)
  }
  client = await pool.connect()
  return client
}

module.exports = checkout

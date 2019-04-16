require('dotenv').config()

const query = require('../src/query')

// it ('query', () => {
//   return query('INSERT INTO users(id, name) values($1::int, $2::text) returning *', [2, 'lorem'])
//     .then(rows => {
//       return expect(rows[0]).toMatchSnapshot()
//     })
// })

it ('SELECT * FROM users WHERE id = $1', () => {
   return query('SELECT * FROM users WHERE id = $1', [2])
    .then(rows => {
      return expect(rows[0]).toMatchSnapshot()
    })
})

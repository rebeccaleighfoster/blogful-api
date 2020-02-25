const knex = require('knex')
const app = require('./app')
const { PORT, DB_URL } = require('./config')

const db = knex({
    client: 'pg',
    connection: {
      host     : 'localhost',
      port      : '5432',
      user     : 'postgres', 
      database : 'blogful',
      charset  : 'utf8',
      timezone : 'utc'
    }
  })

  app.set('db', db)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
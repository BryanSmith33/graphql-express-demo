require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const connectionString = process.env.CONNECTION_STRING
const todoContr = require('./todoController')
const schema = require('./schema')
const app = express()


app.use(bodyParser.json())
app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

massive(connectionString).then(dbInstance => app.set('db', dbInstance))

app.post(`/api/todo`, todoContr.create)
app.get(`/api/todos`, todoContr.getAllTodos)
app.get(`/api/todo/:id`, todoContr.getTodo)
app.put(`/api/todo/:id`, todoContr.update)
app.delete(`/api/todo/:id`, todoContr.delete)

const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log(`The magic is happening on port ${PORT} 😘`))
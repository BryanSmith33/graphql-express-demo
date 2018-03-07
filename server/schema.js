const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} = graphql // destructure the objects we need from graphql
const fetch = require('node-fetch')

const TodoTypes = new GraphQLObjectType({
  name: 'Todo',
  fields: {
    todo_id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    complete: {type: GraphQLBoolean}
  }
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    todos: {
      type: {
        name: 'Todo',
        fields: {
          todo_id: { type: GraphQLInt },
          name: { type: GraphQLString },
          description: { type: GraphQLString },
          complete: { type: GraphQLBoolean }
        }
      },
      args: {},
      async resolve(parentValue, args) {
        const todos = await fetch('http://localhost:3334/api/todos')
        return todos.json()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
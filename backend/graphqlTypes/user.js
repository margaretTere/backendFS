const { GraphQLObjectType, GraphQLString} = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString }
  }
});

module.exports = UserType;
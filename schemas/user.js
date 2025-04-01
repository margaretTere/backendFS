const { GraphQLSchema } = require('graphql');
const UserQuery = require('../queries/user');
const UserMutation = require('../mutations/user');

const gqlUser = new GraphQLSchema({
  query: UserQuery,
  mutation: UserMutation,
});

module.exports = gqlUser;
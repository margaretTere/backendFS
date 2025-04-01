const { GraphQLSchema } = require('graphql');
const RootQuery = require('../queries/merged');  // Merged Query
const RootMutation = require('../mutations/merged');  // Merged Mutation

// Final merged schema
const mergedSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = mergedSchema;

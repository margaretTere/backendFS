const { GraphQLSchema } = require('graphql');
const EmployeeQuery = require('../queries/employee');
const EmployeeMutation = require('../mutations/employee');

const gqlEmployee = new GraphQLSchema({
  query: EmployeeQuery,
  mutation: EmployeeMutation,
});

module.exports = gqlEmployee;

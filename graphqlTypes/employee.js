const { GraphQLObjectType, GraphQLString, GraphQLFloat } = require('graphql');

const EmployeeType = new GraphQLObjectType({
  name: 'Employee',
  fields: {
    _id: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: { type: GraphQLString },
    designation: { type: GraphQLString },
    salary: { type: GraphQLFloat },
    date_of_joining: { type: GraphQLString },
    department: { type: GraphQLString },
    employee_photo: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString }
  }
});

module.exports = EmployeeType;

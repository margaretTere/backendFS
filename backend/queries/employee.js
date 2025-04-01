const { GraphQLObjectType, GraphQLList, GraphQLString} = require('graphql');
const EmployeeType = require('../graphqlTypes/employee');
const Employee = require('../models/employee');

const EmployeeQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getAllEmployees: {
            type: new GraphQLList(EmployeeType),
            async resolve() {
              return await Employee.find();
            }
        },
        searchEmployeeByEid: {
            type: EmployeeType,
            args: { eid: { type: GraphQLString } },
            async resolve(_, { eid }) {
              return await Employee.findById(eid);
            }
        },
        searchEmployeeByDesignationOrDepartment: {
            type: new GraphQLList(EmployeeType),
            args: {
              designation: { type: GraphQLString },
              department: { type: GraphQLString }
            },
            async resolve(_, { designation, department }) {
              const filter = {};
              if (designation) filter.designation = designation;
              if (department) filter.department = department;
              return await Employee.find(filter);
            }
        }
    }
});

module.exports = EmployeeQuery;
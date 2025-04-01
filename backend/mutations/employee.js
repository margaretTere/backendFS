const { 
    GraphQLObjectType, 
    GraphQLNonNull, 
    GraphQLList, 
    GraphQLFloat, 
    GraphQLString} = require('graphql');
    
const EmployeeType = require('../graphqlTypes/employee');
const Employee = require('../models/employee');

const EmployeeMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addEmployee: {
            type: EmployeeType,
            args: {
              first_name: { type: new GraphQLNonNull(GraphQLString) },
              last_name: { type: new GraphQLNonNull(GraphQLString) },
              email: { type: new GraphQLNonNull(GraphQLString) },
              gender: { type: new GraphQLNonNull(GraphQLString) },
              designation: { type: new GraphQLNonNull(GraphQLString) },
              salary: { type: new GraphQLNonNull(GraphQLFloat) },
              date_of_joining: { type: new GraphQLNonNull(GraphQLString) },
              department: { type: new GraphQLNonNull(GraphQLString) },
              employee_photo: { type: GraphQLString }
            },
            async resolve(_, args) {
              const employee = new Employee(args);
              await employee.save();
              return employee;
            }
        },
        updateEmployeeByEid: {
            type: EmployeeType,
            args: {
              eid: { type: new GraphQLNonNull(GraphQLString) },
              first_name: { type: GraphQLString },
              last_name: { type: GraphQLString },
              email: { type: GraphQLString },
              gender: { type: GraphQLString },
              designation: { type: GraphQLString },
              salary: { type: GraphQLFloat },
              department: { type: GraphQLString },
              employee_photo: { type: GraphQLString }
            },
            async resolve(_, { eid, ...args }) {
              return await Employee.findByIdAndUpdate(eid, args, { new: true });
            }
        },
        deleteEmployeeByEid: {
            type: EmployeeType,
            args: { eid: { type: new GraphQLNonNull(GraphQLString) } },
            async resolve(_, { eid }) {
              return await Employee.findByIdAndDelete(eid);
            }
        }
    }
});

module.exports = EmployeeMutation;
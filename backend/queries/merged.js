const { GraphQLObjectType, GraphQLList, GraphQLString} = require('graphql');
const EmployeeType = require('../graphqlTypes/employee');
const Employee = require('../models/employee');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const CFG = require('../config/cfg');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      login: {
        type: GraphQLString,

        args: {
          emailOrUsername: { type: GraphQLString },
          password: { type: GraphQLString }
        },

        async resolve(_, { emailOrUsername, password }) {
          const user = await User.findOne (
            { 
                $or: [
                    { username: emailOrUsername }, 
                    { email: emailOrUsername }
                ] 
            });
          if (!user) throw new Error('User not found');

          const isMatch = await user.matchPassword(password);
          if (!isMatch) throw new Error('Invalid credentials');
  
          const token = jwt.sign(
            { userId: user._id }, 
            CFG.SECRET, 
            { expiresIn: '1h' }
          );
          return token;
        }
      },

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

module.exports = RootQuery;
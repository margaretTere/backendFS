const { 
    GraphQLObjectType, 
    GraphQLNonNull, 
    GraphQLList, 
    GraphQLFloat, 
    GraphQLString} = require('graphql');   
const EmployeeType = require('../graphqlTypes/employee');
const UserType = require('../graphqlTypes/user');
const Employee = require('../models/employee');
const User = require('../models/user');

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      signup: {
        type: UserType,
        args: {
          username: { type: new GraphQLNonNull(GraphQLString) },
          email: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) }
        },
        async resolve(_, { username, email, password }) {
          const userExists = await User.findOne(
            { 
                $or: [
                    { email }, 
                    { username }
                ] 
            }
          );
          if (userExists) throw new Error('User already exists');
  
          const user = new User({ username, email, password });
          await user.save();

          user.password = '***';
          return user;
        }
      },

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
            date_of_joining: { type: GraphQLString },
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


module.exports = RootMutation;
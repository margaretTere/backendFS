const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql');
const User = require('../models/user');
const UserType = require('../graphqlTypes/user');

const UserMutation = new GraphQLObjectType({
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
    }
});

module.exports = UserMutation;
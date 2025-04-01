const { GraphQLObjectType, GraphQLString} = require('graphql');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const CFG = require('../config/cfg');

const UserQuery = new GraphQLObjectType({
    name: 'UserQueryType',
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
    }
});

module.exports = UserQuery;
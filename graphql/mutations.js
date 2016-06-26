import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/type';

import {
  createUser,
} from './resolvers';
import {
  user,
} from './types';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: user,
      args: {
        email: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: createUser,
    },
  },
});

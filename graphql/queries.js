import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/type';

import {
  getUser,
} from './resolvers';
import {
  user,
} from './types';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    getUser: {
      type: user,
      args: {
        email: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve: getUser,
    },
  },
});

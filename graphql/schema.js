import {GraphQLSchema} from 'graphql/type';

import mutations from './mutations';
import queries from './queries';

export default new GraphQLSchema({
  mutation: mutations,
  query: queries,
});

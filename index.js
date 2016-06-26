require('babel-polyfill');
require('babel-register');

const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require('./graphql/schema').default;

const app = express();
const PORT = process.env.PORT || 8000;

app.use('/', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(PORT, () => {
  console.log('Node app is running on port', PORT);
});

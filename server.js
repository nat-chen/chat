const { ApolloServer } = require('apollo-server');

const { sequelize } = require('./models');

const resolvers = require('./graphaql/resolver');
const typeDefs = require('./graphaql/typeDefs');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ctx => ctx,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
  sequelize
    .authenticate()
    .then(() => console.log('database connection'))
    .catch(err => console.log(err))
});
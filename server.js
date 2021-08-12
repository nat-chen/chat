const { ApolloServer } = require('apollo-server');

const { sequelize } = require('./models');

const resolvers = require('./graphaql/resolver');
const typeDefs = require('./graphaql/typeDefs');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
  sequelize.authenticate()
    .then(() => console.log('database connection'))
    .catch(err => console.log(err))
});
const app = require('./config/app');
const CFG = require('./config/cfg');
const connectToMongo = require('./config/db');

connectToMongo();

app.listen(CFG['SERVER_PORT'], () => {
    console.log('Server with GraphQL functionality started');
    console.log('ENDPOINTS:');
    console.log(`http://localhost:${CFG['SERVER_PORT']}${CFG['GRAPHQL_API']}`);
});
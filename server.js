const app = require('./config/app');
const CFG = require('./config/cfg');
const connectToMongo = require('./config/db');

connectToMongo();

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log('Server with GraphQL functionality started');
 });
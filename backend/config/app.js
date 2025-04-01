const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require("express-graphql");
const CFG = require('./cfg');
const mergedSchema = require('../schemas/merged');
const auth = require('./auth');

const app = express();

app.use(cors({
  credentials: true
}));
app.use(express.json());

app.use(
  CFG['GRAPHQL_API'], 
  auth,
  graphqlHTTP({
    schema: mergedSchema,
    graphiql: true
  })
);

module.exports = app;
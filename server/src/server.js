// IMPORTS
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { mergeTypes, mergeResolvers, fileLoader } from 'merge-graphql-schemas'

// CONFIG
require('dotenv').config()
const app = express();

// MONGODB MODELS
import models from './models'

// GRAPHQL TYPES-RESOLVERS
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './graphql/types')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './graphql/resolvers')));

// DATABASE CONNECTION
mongoose.Promise = global.Promise
mongoose
    .connect(`YOUR_MONGODB_CONNECTION_STRING`)
    .then(() => {
        console.log(`Connection to database successful!`);
        console.log('----------------------------------');
    })
    .catch(err => console.log(`Error connecting to database: ${err}`))

// LOGGER
app.use(morgan('dev'));

// CORS
app.use(cors('*'));

// GRAPHQL SETUP
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

app.use('/graphql', express.json(), graphqlExpress({ schema, context: models }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// START APP
app.listen(process.env.PORT, () => {
  console.log(`Server started in this URL: http://localhost:${process.env.PORT}/graphiql`)
});


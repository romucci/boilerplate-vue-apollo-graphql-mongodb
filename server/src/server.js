// IMPORTS
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import spdy from 'spdy'
import { mergeTypes, mergeResolvers, fileLoader } from 'merge-graphql-schemas'
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'

// CONFIG
require('dotenv').config()
const app = express()

// MONGODB MODELS
import models from './models'

// GRAPHQL TYPES-RESOLVERS
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './graphql/types')))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './graphql/resolvers')))

// DATABASE CONNECTION
mongoose.Promise = global.Promise
mongoose
    .connect(`YOUR_MONGODB_CONNECTION_STRING`)
    .then(() => {
        console.log(`Connection to database successful!`)
        console.log('----------------------------------')
    })
    .catch(err => console.log(`Error connecting to database: ${err}`))

// LOGGER
app.use(morgan('dev'))

// CORS
app.use(cors('*'))

// GRAPHQL SETUP
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

app.use('/graphql', express.json(), graphqlExpress({ schema, context: models }))
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `wss://localhost:${process.env.PORT}/subscriptions`
}))

// SETUP HTTP2 OPTIONS
const options = {
    key: fs.readFileSync('__YOUR_KEY_FILE__'),
    cert: fs.readFileSync('__YOUR_CERT_FILE__'),
    passphrase: '__YOUR_PASS_PHRASE__'
}

// CREATE SERVER WITH HTTP/2
const server =
    spdy.createServer(options, app)
        .listen(process.env.PORT, () => {
            new SubscriptionServer({ execute, subscribe, schema }, { server, path: '/subscriptions' })
            console.log(`Server started in this URL: https://localhost:${process.env.PORT}/graphiql`)}
        )


// IMPORTS
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
/* UNCOMMENT FOR HTTP2

import fs from 'fs'
import spdy from 'spdy'
import favicon from 'serve-favicon'

*/
import serveStatic from 'serve-static'
import { createServer } from 'http'
import { mergeTypes, mergeResolvers, fileLoader } from 'merge-graphql-schemas'
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'

// CONFIG
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 8081

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

// SERVE STATIC FILES
app.use(serveStatic(__dirname + "/dist"));
app.use('*', serveStatic(__dirname + "/dist"))
// app.use(favicon(path.join(__dirname, 'dist', 'static', 'favicon.png')))


// GRAPHQL SETUP
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

app.use('/graphql', express.json(), graphqlExpress({ schema, context: models }))
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:8081/subscriptions`
}))

/* UNCOMMENT FOR HTTPS2

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
*/

// CREATE SERVER WITH HTTP
const ws = createServer(app);
ws.listen(PORT, () => {
  console.log(`Apollo Server is now running on http://localhost:${PORT}`)
  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server: ws,
    path: '/subscriptions',
  })
})

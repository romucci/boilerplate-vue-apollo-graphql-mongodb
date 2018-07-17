import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { createHttpLink } from 'apollo-link-http'
import { getMainDefinition } from 'apollo-utilities'

// SET HTTPS LINK
const httpLink = createHttpLink({
  uri: 'https://localhost:8081/graphql'
})

// CREATE WEBSOCKET LINK
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:8081',
  options: {
    reconnect: true,
    connectionParams: {
      token: localStorage.getItem('token'),
      refreshToken: localStorage.getItem('refreshToken')
    }
  }
})

// SPLIT QUERIES AND SUBSCRIPTIONS
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

import { ApolloClient } from 'apollo-client'
import { ApolloLink, split } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import { WebSocketLink } from 'apollo-link-ws'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { getMainDefinition } from 'apollo-utilities'

// SET HTTP or HTTPS LINK * JUST ADD TO HTTP *
const httpLink = createHttpLink({
  uri: 'http://localhost:8081/graphql'
})

// SET CONTEXT WITH HEADERS * WORKS FOR AUTHENTICATION *
const middlewareLink = setContext(() => ({
  headers: {
    'x-token': localStorage.getItem('token'),
    'x-refresh-token': localStorage.getItem('refreshToken')
  }
}))

// SET TOKENS AFTER THE RESPONSE
const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const { response: { headers } } = operation.getContext()
    if (headers) {
      const token = headers.get('x-token')
      // const refreshToken = headers.get('x-refresh-token')

      if (token) {
        localStorage.setItem('token', token)
      }
      /* UNCOMMENT FOR REFRESH TOKENS
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken)
        }
      */
    }

    return response
  })
})

// JOINING THE APOLLO LINKS
const httpLinkWithMiddleware = afterwareLink.concat(
  middlewareLink.concat(httpLink)
)

// CREATE WEBSOCKET LINK * ADD S TO WS FOR HTTP2 *
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:8081/subscriptions',
  options: {
    reconnect: true,
    connectionParams: {
      token: localStorage.getItem('token')
      // refreshToken: localStorage.getItem('refreshToken')
    }
  }
})

// ERROR HANDLING
const error = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`[GraphQL error]: ${networkError}`)
  } else if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})

// SPLIT QUERIES AND SUBSCRIPTIONS
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLinkWithMiddleware
)

// EXPORT APOLLO CLIENT
export default new ApolloClient({
  link: error.concat(link),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

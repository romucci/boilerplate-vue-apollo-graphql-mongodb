import gql from 'graphql-tag'

// GREETING QUERY
export const GREETING_QUERY = gql`
  query greeting {
    getGreeting   
  }
`

// GREETING SEEN SUBSCRIPTION
export const GREETING_SUBSCRIPTION = gql`
  subscription greetingSeen {
    greetingSeen
  }
`

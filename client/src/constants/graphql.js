import gql from 'graphql-tag'

export const GREETING_QUERY = gql`
  query greeting {
      getGreeting   
  }
`

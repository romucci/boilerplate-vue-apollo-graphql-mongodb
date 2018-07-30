export default `
    
    type Human {
      name: String!
      age: Int
      country: String
    }
    
    type Query {
      getGreeting: String!
    }
    
    type Subscription {
      greetingSeen: String!
    }
    
    schema {
      query: Query
      subscription : Subscription
    }
    
`
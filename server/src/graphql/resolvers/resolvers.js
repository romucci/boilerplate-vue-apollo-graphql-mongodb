import { PubSub } from 'graphql-subscriptions'

export const pubsub = new PubSub()

export default {
    Subscription: {
        greetingSeen: {
            subscribe: () => pubsub.asyncIterator('GREETING_SEEN')
        }
    },
    Query: {
        getGreeting: (parent, args, models) => {
            const greeting = 'Hello from the server!'
            pubsub.publish('GREETING_SEEN', { greetingSeen: greeting })
            return 'Hello from the server!'
        }
    }

}
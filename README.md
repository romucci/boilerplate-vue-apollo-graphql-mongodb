# Boilerplate Vue + Vuex + Vuetify + Apollo Client + GraphQL + Express + MongoDB + HTTP/2

Just a simple way of starting your projects with these marvelous technologies!

### Installing
Download or clone the repository and access the server folder

```
- cd server
- npm install 
```

Then navigate towards the client folder and wait for dependencies to finish downloading

```
- cd client
- npm install
```

After that you will need to determine your the MongoDB connection string in server.js, 
as well as the database user and password inside an .env file in the server folder. Furthermore you can setup 
HTTP/2 with a CERT and KEY files (Use OpenSSL if you do not own a valid certificate).

When everything is ready, you just perform:

```
- cd client
- npm start
```

and 

```
- cd server
- npm start
```

and VOALA, you are good to go!

## Build

If you need or want to build your client app and use just one server, you can perform

```
- cd client
- npm run build
```

then you take the result folder and take it to the server-side src folder.

>>REMEMBER!
You have to change the GraphQL uri in the Apollo Client and the WebSocket uri accordingly!

You may also need to set your favicon!

## Built With
* [Vue](https://github.com/vuejs/vue) - The web framework used
* [Vuex](https://github.com/vuejs/vuex) - State Management
* [Vue-router](https://github.com/vuejs/vue-router) - Routing
* [Vuetify](https://github.com/vuetifyjs/vuetify) - Material UI Design
* [Vue-Apollo](https://github.com/Akryum/vue-apollo) - Integration for Apollo/GraphQL
* [GraphQL](http://graphql.org/) - A Query Language for APIs
* [Express](http://expressjs.com/) - Fast minimalist web framework for NodeJS
* [NodeJS](https://github.com/nodejs/node) - JavaScript run-time environment
* [Mongoose](http://mongoosejs.com/) - ORM for MongoDB
* [MongoDB](http://www.mongodb.com) - No-SQL database 
* [Babel-watch](https://github.com/kmagiera/babel-watch) - Hot Reload for Babel-Node Apps

## Authors

* **Lucas Otero** - *Initial work* - [Romucci](https://github.com/romucci)

## License

This project is licensed under the MIT License. It is free :D. Use it as you please.

## Acknowledgments

I have compiled all the different technologies I have learnt to love and put them all together in a simple-to-start-with package!
Hope you love it too!
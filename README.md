SUPER TIC TAC TOE
===================


This project is a complex Tic Tac Toe build with React and Node.

----------


Demand
-------------

Create a Tic Tac Toe in Node and add the possibility to play in multiplayer.

Add on
-------------

* JWT authentification.
* Server Side logic
* Restfull API
* Save on database
* 3 levels AI
* Stats


How to start
-------------

Clone the repository and lunch
```
npm install
```

You need to create a Mongodb data base and configure the ```.env``` file (and maybe ```./src/path/Conf.js```)

and finaly run ```npm start```

Now go on `localhost:3000`
and take a look on the doc on `localhost:3001/docs`

The project
-------------

> ./api

Contain all the router and api logic. `Route.js` define all the routes of the application.

> ./models

Only two models here : `GameModel` & `UserModel`

> ./public

The compile css, pictures and the `index.html` file, entry point of the app.

> ./api

contain all the router and api logic. `Route.js` define all the routes of the application.

> ./index.js

The global server configuration.

> ./src

Contain the app.

> ./src/index.js

Js entry point of the app.

> ./src/components

All react components.

> ./src/GlobalStore/Store.js

Define the global store.

> ./src/actions

All actions of the store.

> ./src/reducers

All reducers of the store.

> ./src/ia

Define the *Artificial Inteligence* here.

Use
-------------

* ReactJS (Front)
* Redux (Store logic)
* Hapi (Server)
* Nes (Hapi socket)
* Joi (route validation)
* jsonwebtoken (Tocken Auth)
* bcrypt (password encrypt/decrypt)
* dotenv (.env use)
* Mongoose (MongoDB)
* Echart (Stats)
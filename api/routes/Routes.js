import Joi               from 'joi'
import path              from 'path'
import jwt               from 'jsonwebtoken'
import Nes               from 'nes'

import Paths             from '../conf/Paths'
import UserController    from '../controllers/UserController.js'
import SessionController from '../controllers/SessionController.js'
import GameController    from '../controllers/GameController.js'
require('dotenv').config()

const validate = function (token, request, callback) {
  const publicKey = 'patate'
  jwt.verify(token, publicKey, (err, decoded) => {
    if (err) return callback(err)
    return callback(null, true, decoded)
  })
}


module.exports = server => {
  server.register(require('hapi-auth-jwt-simple'), (err) => {
    if(err){
      console.log(err)
    }

    server.auth.strategy('jwt', 'jwt', {
      validateFunc: validate
    })

    server.auth.default('jwt')

    server.subscription(Paths.game.start+'/{id}')
    server.subscription(Paths.game.play+'/{id}')
    server.subscription(Paths.game.disconnect+'/{id}')


    server.route({
      method: 'POST',
      path: Paths.game.start,
      config: {
        auth: 'jwt',
        description: 'Call when a player wants to start a multiplayer game with a specific player',
        tags: ['api'],
        handler: (request, h) => {
          const payload = JSON.parse(request.payload)
          server.publish(`${Paths.game.start}/${payload.player1}`, payload.game)
          server.publish(`${Paths.game.start}/${payload.player2}`, payload.game)
        }
      }
    })

    server.route({
      method: 'POST',
      path: Paths.game.play,
      config: {
        auth: 'jwt',
        description: 'Call when a player play a run',
        tags: ['api'],
        handler: (req, cb) => {
          const payload = JSON.parse(req.payload)
          GameController.play(req, (updatedGame) => {
            server.publish(`${Paths.game.play}/${payload.player1.id}`, updatedGame)
            server.publish(`${Paths.game.play}/${payload.player2.id}`, updatedGame)
            return cb({ok:'ok'}).code(200)
          })
        }
      }
    })
    server.route({
      method: 'POST',
      path: Paths.game.playIa,
      config: {
        auth: 'jwt',
        description: 'Call when a player wants to start a game against IA',
        tags: ['api'],
        handler: (req, cb) => {
          const payload = JSON.parse(req.payload)
          GameController.playIa(req, (updatedGame) => {
            server.publish(`${Paths.game.play}/${payload.player1.id}`, updatedGame)
            cb({updatedGame:'updatedGame'}).code(200)
          })
        }
      }
    })

    server.route({
      method: 'GET',
      path: Paths.game.wait,
      config: {
        id:'wait',
        auth: 'jwt',
        description: 'Call when a player wait on the salloon',
        tags: ['api'],
        handler: (request, reply) => {
          server.broadcast(request.auth.credentials)
        }
      }
    })

    server.route({
      method: 'GET',
      path: Paths.game.quit,
      config: {
        id:'quit',
        auth: 'jwt',
        description: 'Call when a player quit the saloon',
        tags: ['api'],
        handler: (request, reply) => {
          server.broadcast({disconnect:true, creds:request.auth.credentials})
        }
      }
    })

    server.route({
      method: 'GET',
      path: Paths.game.disconnect,
      config: {
        id:'disconnect',
        auth: 'jwt',
        description: 'Call when a player quit a running party',
        tags: ['api'],
        handler: (request, reply) => {
          console.log(request.auth.credentials.pseudo+' is disconnected')
          server.publish(`${Paths.game.disconnect}/${request.auth.credentials.id}`, {disconnect:true, creds:request.auth.credentials})
        }
      }
    })

    server.route({
      method: 'GET',
      path: Paths.users.getStats,
      config: {
        id:'getStats',
        description: 'Return stats for a specific player',
        auth: 'jwt',
        tags: ['api'],
        handler: UserController.getStats
      }
    })

    server.route({
      method: 'GET',
      path: Paths.users.getById,
      config: {
        auth: 'jwt',
        description: 'Get user by id',
        tags: ['api'],
        handler: UserController.getUserById
      }
    })

    server.route({
      method: 'GET',
      path: Paths.intern.users,
      config: {
        auth: 'jwt',
        description: 'Return all users',
        tags: ['api'],
        handler: UserController.getUsers
      }
    })

    server.route({
      method: 'POST',
      path: Paths.game.create,
      config: {
        auth: 'jwt',
        tags: ['api'],
        description: 'Create a new game',
        validate: {
          payload: {
            player1: Joi.string().alphanum().required(),
            player2: Joi.string().alphanum().required()
          },
          failAction: (request, reply, source, error) => {
            console.log(error.data.details[0].message)
            reply({
                errorMessage: error.data.details[0].message
            }).code(401)
          }
        },
        handler: GameController.createGame
      }
    })

    server.route({
      method: 'POST',
      path: Paths.intern.createUsers,
      config: {
        auth: false,
        tags: ['api'],
        description: 'Create an user',
        validate: {
          payload: {
            username: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            email: Joi.string().email().required(),
          },
          failAction: (request, reply, source, error) => {
            console.log(error.data.details[0].message)
            reply({
                errorMessage: error.data.details[0].message
            }).code(401)
          }
        },
        handler: UserController.createUser
      }
    })

    server.route({
      method: 'POST',
      path: Paths.session.create,
      config: {
        auth: false,
        description: 'Create session',
        handler: SessionController.create
      }
    })
  })
}
import Joi               from 'joi'
import path              from 'path'
import jwt               from 'jsonwebtoken'

import Paths             from '../conf/Paths'
import UserController    from '../controllers/UserController.js'
import SessionController from '../controllers/SessionController.js'


const validate = function (token, request, callback) {
  const publicKey = 'patate'
  jwt.verify(token, publicKey, (err, decoded) => {
    if (err) return callback(err)
    console.log(decoded, callback)
    return callback(null, true, decoded)
  })
}


module.exports = server => {
  server.register(require('hapi-auth-jwt-simple'), (err) => {
    if(err){
      console.log(err);
    }

    server.auth.strategy('jwt', 'jwt', {
      validateFunc: validate
    })

    server.auth.default('jwt')

    server.route({
      method: 'GET',
      path: Paths.intern.path,
      config: {
        auth: false,
        tags: ['api']
      },
      handler: (request, h) => {
        return 'Hello!';
      }
    })

    server.route({
      method: 'GET',
      path: Paths.intern.users,
      config: {
        auth: 'jwt',
        tags: ['api']
      },
      handler: UserController.getUsers
    })

    server.route({
      method: 'GET',
      path: Paths.intern.login,
      config: {
        auth: false,
        tags: ['api']
      },
      handler: (request, h) => {
        return 'Hello!';
      }
    })

    // server.route({
    //   method: 'GET',
    //   path: Paths.intern.users,
    //   config: {
    //     auth: false,
    //     tags: ['api'],
    //     handler: UserController.getUsers
    //   }
    // })
    server.route({
      method: 'POST',
      path: Paths.session.create,
      config: {
        auth: false,
        handler: SessionController.create,
        // validate: {
        //   username: Joi.string().alphanum().min(3).max(30).required(),
        //   password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
        //   failAction: (request, reply, source, error) => {
        //     reply({
        //         idErr: 1
        //     })
        //   }
        // }
      }
    })
  })
}
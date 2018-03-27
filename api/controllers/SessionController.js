import UserController from '../controllers/UserController.js'
import _              from 'lodash'
import jwt            from 'jsonwebtoken'
import bcrypt         from 'bcrypt'

function getUserScheme(payload) {

  let pseudo
  let type
  let userSearch = {}

  // The POST contains a username and not an email
  if(payload.username) {
    pseudo     = payload.username
    type       = 'username'
    userSearch = { pseudo: pseudo }
  }
  // The POST contains an email and not an username
  else if(payload.email) {
    pseudo     = payload.email
    type       = 'email'
    userSearch = { email: pseudo }
  }
  userSearch.password = payload.password

  return {
    pseudo    : pseudo,
    type      : type,
    userSearch: userSearch
  }
}

function createToken(user) {
  return jwt.sign({pseudo: user.pseudo, games: user.games, id: user._id}, 'patate')
}


const SessionController = {

  create: (req, reply) => {
    const payload    = JSON.parse(req.payload)
    const userScheme = getUserScheme(payload)

    if (!userScheme.pseudo || !payload.password) {
      return reply({message:"You must send the username and the password"}).code(400)
    }

    UserController.getUser(userScheme.userSearch, (user, err) => {
      if(err) return reply({message:"an error has occurred"}).code(500)

      if (!user) {
        return reply({message:"The username or password don't match"}).code(401)
      }

      return reply({
        id_token: createToken(user)
      }).code(201)
    })

  },

  broadcast: data => console.log('Broadcast not ready =======> ', data)

}

export default SessionController